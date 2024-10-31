# Library-book-registry
 Киберия. Тестовое задание для PHP-разработчика
# Инструкция по инициализации
1) Скачиваем репозиторий (с помощью команды или архивом)
2) Устанавливаем/обновляем зависимости с помощью композера (composer install/composer update)
3) Смотрим какие требования не удовлетворены - исправляем (например, требуется новая версия PHP)
4) Также, скорее всего, придется обновить файл конфигурации php.ini (ниже представлена моя текущая конфигурация):

        ;extension=ldap
        extension=curl
        ;extension=ffi
        ;extension=ftp
        extension=fileinfo
        ;extension=gd
        ;extension=gettext
        ;extension=gmp
        extension=intl
        ;extension=imap
        extension=mbstring
        ;extension=exif      ; Must be after mbstring as it depends on it
        ;extension=mysqli
        ;extension=oci8_12c  ; Use with Oracle Database 12c Instant Client
        ;extension=oci8_19  ; Use with Oracle Database 19 Instant Client
        ;extension=odbc
        extension=openssl
        ;extension=pdo_firebird
        extension=pdo_mysql
        ;extension=pdo_oci
        ;extension=pdo_odbc
        ;extension=pdo_pgsql
        ;extension=pdo_sqlite
        extension=pgsql
        ;extension=shmop        
        ;extension=snmp        
        ;extension=soap
        ;extension=sockets
        extension=sodium
        ;extension=sqlite3
        ;extension=tidy
        ;extension=xsl
        ;extension=zip
   
5) Далее, чтобы в будущем без пробем запускать, vite выполняем команду:

       npm i cross-env --save

6) Заменяем пример файла окружения на нормальную версию командой (или переименовываем вручную):
  
       mv .env.example .env 

7) Устанавливаем ключ приложения:

       php artisan key:generate 

8) Развертываем БД в контейнере (файл оркестратора контейнеров уже есть в проекте) или на локальной машине.
9) После обновления файла окружения, делаем миграции и заполняем БД тестовыми данными:

       php artisan migrate
       php artisan db:seed --class=DatabaseSeeder

10) Запускаем приложение с помощью npm (npm run dev "&") и artisan (php artisan serve) одновременно

11) Заходим в роли администратора (для всех обычных пользователей пароль - testPass12345):

        email => admin@example.com

        password => testAdminPass12345

    Примечания:

    В профиль может войти любой пользователь из-за того, что сущность пользователя и автора связаны, но получить доступ
    к панели администратора - только заранее указанные пользователи. Связать сущности автора и пользователя я посчитал целесообразным
    в связи с возможной перегруженностью автора аутентификационными данными.

    После входа как администратор, имеем четыре основные страницы для навигации
    (greetings - просто приветствие с указанием возможностей пользователя). 

# API - примеры использования
1) Запрос на авторизацию пользователя (полученный токен - вставляем в дальнейшем в запросы в раздел заголовка Authorization как Bearer Token, удобно это можно сделать в такой программе как Postman):

       http://127.0.0.1:8000/api/author/auth/login?email=mariane45@example.net&password=testPass12345

2) Получение списка книг с именем автора:

       http://127.0.0.1:8000/api/books/get/with_author_name

3) Получение данных книги по id, авторизация не обязательна:

       http://127.0.0.1:8000/api/books/get/5

4) Обновление данных книги, авторизация под автором книги обязательна (обновить возможно только книгу текущего автора, передать можно один или несколько параметров):

       http://127.0.0.1:8000/api/books/update/12?title=NewTitle&publication_type=0

5) Удаление книги, авторизация под автором книги обязательна (удалить можно только "свою книгу"):
    
        http://127.0.0.1:8000/api/books/delete/12

6) Получение списка авторов с указанием количества книг, авторизация не обязательна (с пагинацией):

        http://127.0.0.1:8000/api/authors/get/with_books_count

7) Получение данных автора со списком книг, авторизация не обязательна:

       http://127.0.0.1:8000/api/authors/get/4/with_books
   
8) Обновление данных автора, авторизация под автором обязательна (можно обновлять только свои данные, передать можно один или несколько запросов).

       http://127.0.0.1:8000/api/authors/update/2?name=Marika&day_of_birth=1998-12-01

9) Список жанров со списком книг внутри (с пагинацией).

       http://127.0.0.1:8000/api/genres/get/with_books
