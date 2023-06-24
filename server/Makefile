IMAGE_NAME = server
IMAGE_TAG = latest
PROJECT_ID = $(shell gcloud config get-value project)

gcloud-docker-init:
	gcloud auth configure-docker

gcloud-docker-build:
	docker build -t gcr.io/$(PROJECT_ID)/$(IMAGE_NAME):$(IMAGE_TAG) -f Dockerfile .

gcloud-docker-push:
	docker push gcr.io/$(PROJECT_ID)/$(IMAGE_NAME):$(IMAGE_TAG)

gcloud-run-deploy:
	gcloud run deploy $(IMAGE_NAME) --image gcr.io/$(PROJECT_ID)/$(IMAGE_NAME):$(IMAGE_TAG) \
	--max-instances 1 \
	--platform managed \
	--labels envvirement=$(IMAGE_TAG) \
	--region europe-central2  \
	--allow-unauthenticated