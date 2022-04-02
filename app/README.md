# Kibernum Front-end Technical Test - Docker Project
### by: Andres vega - afelipe.vega@gmail.com
### cel : 3012017499
### @philipretl

## Backend

- Requirements =>
    - Docker.


- Installation =>
    - docker-compose build && docker-compose up -d
    - docker exec -it kibernum_front /bin/bash
    - inside of container =>
        - composer install
        - cp .env.example .env
        - php artisan key:generate