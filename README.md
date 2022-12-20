# natours-node

Приложение для покупки туров путешествий (учебный проект).

Приложение доступно по адресу https://natours-kn96.onrender.com/

Документация API для этого приложения доступна по
адресу: https://documenter.getpostman.com/view/19081492/UzJFudfi.

# Описание приложения

Приложение позволяет пользователям бронировать туры. Под туром понимается серия
специально подобранных мест (локаций), по которым путешественников проводят
гиды.

Пользователь, который еще не создал учетную запись в приложении, может просто
просмотреть все текущие туры, а также подробную информацию о каждом туре.

После регистрации или входа в систему пользователи получают возможность
бронировать туры, редактировать профиль: менять email, пароль, фотографию,
просматривать купленные туры.

# Стек

- База данных: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Object Data Modelling (ODM): [Mongoose](https://mongoosejs.com/)
- Rest API framrwork: [Express](http://expressjs.com/)
- View enginee (шаблонизатор): [Pug](https://pugjs.org/api/getting-started.html)
- Платежный шлюз: [Stripe](https://stripe.com/)
- [JSON Web Token](https://jwt.io/)
- Сервисы для отправки уведомлений на почту
  клиенту: [Mailtrap](https://mailtrap.io/) & [Sendgrid](https://sendgrid.com/)
- Сборка javascript для фронтенда: [Esbuild](https://esbuild.github.io/)
- Хостинг: [Heroku](https://www.heroku.com/)
- Для тестирования API: [Postman](https://www.getpostman.com/)

### Архитектура (модель проектирования): MVC

- Папка Model - это модель данных для бизнес-сущностей: пользователь, отзыв,
  тур, бронирование.
- Папка Controller - это бизнес-слой, используемый для обработки логики
  приложения.
- Папка Views - это презентационный слой, используемый для отображения
  пользовательского интерфейса, он состоит из pug-файлов.
- Папка Routes - маршрутизация сервисов rest-api.
- Папка Public - это папка, содержащая статические файлы HTML/css/изображения.
  Она используется для интеграции с папкой views.

# Как пользоваться приложением

Чтобы забронировать тур вам нужно залогиниться или зарегистрироваться. Для
логина можно использовать один из существующих тестовых аккаунтов, например:

логин: loulou@example.com\
пароль: test1234

или:

логин: my@example.com\
пароль: test1234

Для регистрации можно ввести любой валидный email - в адресе должен быть
символ "@". Пароль должен быть не менее 8 символов.

## Забронировать тур

После выбора понравившегося вам тура вы попадете на страницу оплаты. Покупка
тура выполняется через платежный сервис Strapi.
Для покупки тура можно использовать тестовые данные карты:

- Номер карты: 4242 4242 4242 4242 4242
- Дата истечения срока действия: - любая дата в будущем относительно текущей
  вашй даты, например: 09/29
- CVV: любые три цифры (222, 333 - и так далее)

# Как запустить проект локально

* Клонируйте репозиторий: https://github.com/haosmos/natours-node.git
* Using the terminal, navigate to the cloned repo.
* Установите зависимости: npm install.
* Вам потребуются аккаунты в
  сервисах: [MONGODB (Atlas)](https://www.mongodb.com/atlas)
  , [MAPBOX](https://www.mapbox.com/), [STRIPE](https://stripe.com/en-fi)
  , [SENDGRID](https://sendgrid.com/) [MAILTRAP](https://mailtrap.io/).
* Ваш .env файл должен содержать следующие переменные среды:
  * NODE_ENV=
  * PORT=3000
  
  * USERNAME=
  * DATABASE=
  * DATABASE_PASSWORD=
  * JWT_SECRET_KEY=
  * JWT_EXPIRES_IN=90d
  * JWT_COOKIE_EXPIRES_IN=90
  
  * EMAIL_USERNAME=your mailtrap username
  * EMAIL_PASSWORD=your mailtrap password
  * EMAIL_HOST=smtp.mailtrap.io
  * EMAIL_PORT=2525
  * EMAIL_FROM=your real life email address
  * GMAILSEND_USERNAME=
  * GMAILSEND_PASSWORD=
  
  * SENDGRID_USERNAME=apikey
  * SENDGRID_PASSWORD=your sendgrid password
  
  * STRIPE_SECRET_KEY=your stripe secret key
  * STRIPE_WEBHOOK_SECRET=your stripe web hook secret

* Старт сервера: npm start.
* Старт локальной разработки (сборка выполняется esbuild): npm run watch:js.
* Сборка для продакшена: npm run build
