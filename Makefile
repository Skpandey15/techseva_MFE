.PHONY: help \
        docker-build \
        k3d-create k3d-delete k3d-load k3d-status \
        k8s-apply k8s-delete k8s-status \
        k3d-deploy hosts dev

# ── Remote URLs baked into the shell image at build time ──────────────────────
K8S_DOMAIN           := techseva.local
K8S_REMOTE_AUTH      := http://mfe-auth.techseva.local/assets/remoteEntry.js
K8S_REMOTE_JOBSEEKER := http://mfe-jobseeker.techseva.local/assets/remoteEntry.js
K8S_REMOTE_ADMIN     := http://mfe-admin.techseva.local/assets/remoteEntry.js

TAG ?= latest

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
	  | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-25s\033[0m %s\n", $$1, $$2}'

# ── Docker builds ─────────────────────────────────────────────────────────────

docker-build: ## Build all 4 images with k8s ingress URLs
	docker build -f apps/mfe-auth/Dockerfile \
	  -t techseva/mfe-auth:$(TAG) .
	docker build -f apps/mfe-dashboard-jobseeker/Dockerfile \
	  -t techseva/mfe-dashboard-jobseeker:$(TAG) .
	docker build -f apps/mfe-dashboard-admin/Dockerfile \
	  -t techseva/mfe-dashboard-admin:$(TAG) .
	docker build -f apps/shell/Dockerfile \
	  --build-arg VITE_REMOTE_AUTH_URL=$(K8S_REMOTE_AUTH) \
	  --build-arg VITE_REMOTE_JOBSEEKER_URL=$(K8S_REMOTE_JOBSEEKER) \
	  --build-arg VITE_REMOTE_ADMIN_URL=$(K8S_REMOTE_ADMIN) \
	  -t techseva/shell:$(TAG) .

# ── k3d cluster ───────────────────────────────────────────────────────────────

k3d-create: ## Create k3d cluster — Traefik ingress on host ports 80 + 443
	k3d cluster create --config k3d-cluster.yaml
	@echo ""
	@echo "Cluster 'techseva' ready."
	@echo "Run 'make hosts' to see the /etc/hosts entries required."

k3d-delete: ## Delete the k3d cluster
	k3d cluster delete techseva

k3d-status: ## Show cluster node status
	k3d cluster list
	kubectl get nodes -o wide

k3d-load: ## Import Docker images into k3d (no registry needed)
	k3d image import \
	  techseva/mfe-auth:$(TAG) \
	  techseva/mfe-dashboard-jobseeker:$(TAG) \
	  techseva/mfe-dashboard-admin:$(TAG) \
	  techseva/shell:$(TAG) \
	  --cluster techseva

# ── Kubernetes manifests ──────────────────────────────────────────────────────

k8s-apply: ## Apply all manifests and wait for rollout
	kubectl apply -f k8s/namespace.yaml
	kubectl apply -f k8s/mfe-auth.yaml
	kubectl apply -f k8s/mfe-dashboard-jobseeker.yaml
	kubectl apply -f k8s/mfe-dashboard-admin.yaml
	kubectl apply -f k8s/shell.yaml
	kubectl apply -f k8s/ingress.yaml
	@echo ""
	@echo "Waiting for rollouts..."
	kubectl rollout status deployment/mfe-auth                -n techseva
	kubectl rollout status deployment/mfe-dashboard-jobseeker  -n techseva
	kubectl rollout status deployment/mfe-dashboard-admin      -n techseva
	kubectl rollout status deployment/shell                    -n techseva
	@echo ""
	@echo "  App:              http://$(K8S_DOMAIN)"
	@echo "  Auth MFE:         http://mfe-auth.techseva.local"
	@echo "  Jobseeker MFE:    http://mfe-jobseeker.techseva.local"
	@echo "  Admin MFE:        http://mfe-admin.techseva.local"

k8s-delete: ## Delete all k8s resources in the techseva namespace
	kubectl delete -f k8s/ --ignore-not-found

k8s-status: ## Show pods, services, and ingress
	kubectl get pods,svc,ingress -n techseva -o wide

# ── Full workflow (one command) ───────────────────────────────────────────────

k3d-deploy: docker-build k3d-create k3d-load k8s-apply ## Full deploy: build → cluster → load → apply

# ── Local dev (no Docker) ─────────────────────────────────────────────────────

dev: ## Start local pnpm dev servers (no Docker)
	pnpm --parallel --filter './apps/mfe-*' dev &
	sleep 3
	pnpm --parallel --filter './apps/mfe-*' serve &
	sleep 2
	pnpm dev:shell

# ── /etc/hosts helper ────────────────────────────────────────────────────────

hosts: ## Print required /etc/hosts entries for k3d ingress
	@echo ""
	@echo "Add to /etc/hosts  (Windows: C:\\Windows\\System32\\drivers\\etc\\hosts)"
	@echo ""
	@echo "  127.0.0.1  $(K8S_DOMAIN)"
	@echo "  127.0.0.1  mfe-auth.techseva.local"
	@echo "  127.0.0.1  mfe-jobseeker.techseva.local"
	@echo "  127.0.0.1  mfe-admin.techseva.local"
	@echo ""
