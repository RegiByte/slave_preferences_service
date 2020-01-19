install:
	docker-compose up -d
start:
	docker-compose start
stop:
	docker-compose stop
prod:
	./dce yarn build
prod-commit:
	git add .
	git commit -m "built prod files"
prodf:
	make prod
	make prod-commit
