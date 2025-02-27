lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist

start:
	make start-backend

run:
	make start-backend & make start-frontend

build:
	npm run build
