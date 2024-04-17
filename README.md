# MSGS
Messages app

MSGS on viestipalvelusovellus, joka muodostuu neljästä erillisestä rakenteesta:
  - Backend common-moduuli sisältää backendin muiden rakenteiden käyttämiä, yhteisiä toimintoja, kuten migraatiot, Sequelize-ORM -määritykset, tietokantaan yhdistämiseen käytettävät rakenteet, middlewaret, ja loggerin.
  - Backend Userauth-API on REST-arkkitehtuuria mukaileva NodeJS Express-API, jonka avulla suoritetaan sovelluksen käyttäjähallintaan liittyviä toimintoja, kuten käyttäjien lisääminen, tietojen muuttaminen, kirjautuminen, ym.
  - Backend Chats-API on NodeJS Express GraphQL-API, jonka avulla hallitaan sovelukseen liittyviä viestejä sekä keskusteluja. GraphQL-API:n avulla keskusteluihin liittyviä viestejä voidaan välittää asiakassovellukseen GraphQL tilausten (subscription) avulla mahdollisimman viiveettömän toiminnan saavuttamiseksi välttäen samalla ylimääräistä verkkoliikennettä.
  - Frontend React-sovellus, joka hyödyntää em. toimintoja.

Taustalla palvelu hyödyntää Postgres-tietokantaa.

Demoversio sovelluksesta on löydettävissä osoitteesssa [msgs.onrender.com](https://msgs.onrender.com).

Huomaathan, että demosovelluksen käyttäminen vaatii toimivan sähköpostiosoitteen käyttämisen rekisteröitymisen yhteydessä. Tunnuksen aktivointiin käytettävä sähköpostiviesti päätyy suurella todennäköisyydellä vastaanottajan roskapostikansioon, sillä demosovellukseen rekisteröitynä sähköpostipaveluna käytetään maksutonta gmail-tiliä.

## Käyttäjänhallinta REST-API

Käyttäjänhallinta REST-API tarjoaa rajapinnan käyttäjien luomiseen, kirjautumiseen ja käyttäjätietojen hallintaan.

Palvelussa hyödynnetään palvelinpuolen istunnonseurantaa, jonka avulla mahdollisetaan esimerkiksi käyttäjätunnukseen liittyvän salasanan muuttamisen yhteydessä tapahtuva kaikkien kyseiseen käyttäjätunnukseen liittyvien istuntojen invalidointi.

### Endpoints

- `POST /api/users/signup` - Luo uuden käyttäjän
- `GET /api/users/confirm/:confirmationCode` - Aktivoi uuden käyttäjätunnuksen
- `POST /api/users/resetpassword` - Vaihtaa käyttäjän salasanan
- `PATCH /api/users/changeusername` - Vaihtaa käyttäjän käyttäjätunnuksen
- `POST /api/users/passwordresetrequest` - Käynnistää rekisteröityyn sähköpostiosoitteeseen perustuvan salasanan palauttamisen
- `POST /api/users/recoverpassword` - Viimeistelee rekisteröityyn sähköpostiosoitteeseen perustuvan salasanan palauttamisen
- `DELETE /api/users`- Poistaa käyttäjään liittyvät tiedot
- `POST /api/login` - Kirjaa käyttäjän sisään
- `GET /api/login/refresh` - Päivittää kirjautumisen yhteydessä myönnettyyn tokeniin voimassaoloaikaa
- `POST /api/logout` - Kirjaa käyttäjän ulos. Kohdetta voidaan hyödyntää kutsun body-parametrilla "global: true", joka kirjaa ulos kaikki käyttäjätunnukseen rekisteröidyt istunnot.
- `/api/health` - Vastaa HTTP 200 kun sovellus on käynnissä


## Viestien ja keskustelujen hallinta GraphQL-API

GraphQL-API tarjoaa rajapinnan viestien ja keskustelujen hallintaan.

### Tyypit

- `User` - Käyttäjän tiedot
- `Chat` - Keskustelun tiedot
- `Userchat` - Käyttäjän ja keskustelun yhdistävän join-entryn tiedot
- `Message` - Viestin tiedot
- `DeclineRequestResponse` - Keskustelupyynnöstä kieltäytymisen tiedot
- `DeleteMessageResponse` - Viestin poistamisen tiedot

### Queryt

- `findUser(search: String!)` - Hakee käyttäjiä search-parametrin mukaisesti käyttäjätunnuksen tai -ID:n perusteella
- `getUserChats` - Hakee keskustelut kutsun headerissa sisällytetyn tokenin sisältämän käyttäjä-id:n perusteella
- `getChatRequests` - Hakee hyväksymättömät keskustelupyynnöt kutsun headersissa sisällytetyn tokenin sisältämän käyttäjä-id:n perusteella
- `getChatUsers(chatId: Int!)` - Hakee keskusteluun liittyvät käyttäjät, mikäli kutsun headerissa sisällytettyyn tokeniin kuuluva käyttäjä kuuluu keskusteluun
- `getChatMessages(chatId: Int!)` - Hakee keskusteluun liittyvät viestit, mikäli kutsun headerissa sisällytettyyn tokeniin kuuluva käyttäjä kuuluu keskusteluun

### Mutations

- `createChat(userId: Int!)` - Luo uuden keskustelun parametrina annetun käyttäjä-id:n mukaisen käyttäjän, sekä kutsun headerissa annetun tokenin mukaisen käyttäjä-id:n välille.
- `acceptChatRequest(requestId: Int!)` - Hyväksyy parametrina annetun keskustelupyyntötunnuksen mukaisen pyynnön
- `declineChatRequest(requestId: Int!)` - Kieltäytyy parametrina annetun keskustelupyynnön mukaisesta keskustelusta
- `createMessage(chatId: Int!, content: String!)` - Luo uuden viestin keskusteluun
- `updateMessage(chatId: Int, id: Int!, content: String!)` - Muuttaa id:n mukaista viestiä
- `deleteMessage(id: Int!)` - Poistaa viestin

### Subscriptions
- `newChatRequest(userId: Int!)` - Ilmoittaa uusista käyttäjä-id:tä koskevista keskustelupyynnöistä
- `newMessageToChat(chatId: Int!)` - Ilmoittaa uusista keskustelua koskevista viesteistä

GraphQL-rakenteen lisäksi kohteessa on endpoint `/health` joka vastaa HTTP 200 silloin, kun sovellus on käytettävissä.

## React-frontend sovellus

React-frontend sovellus tarjoaa käyttöliittymän viestipalveluun.

Frontend-sovelluksessa ei ole hyödynnetty erillistä tilanhallintakirjastoa. Käyttäjätietoja sekä keskusteluja koskevat tiedot ylläpidetään React-kontekstissa (/src/contexts). Kontekstin lisäksi sovelluksessa hyödynnetään Apollo GraphQL-clientin välimuistia.

### Komponentit

- `LandingPage` - Kirjautumattomalle vierailijalle näytettävä sisältö
- `SignupForm` - Rekisteröitymislomake
- `LoginForm` - Kirjautumislomake
- `RecoverPasswordRequest` - Sähköpostiin perustuvan salasanan palauttamispyynnön käynnistävä lomake
- `PasswordRecoveryForm` - Sähköpostiin perustuvan salasanan palauttamisen toteuttava lomake
- `Menubar` - Valikkorakenne
- `UserProfile` - Käyttäjätietonäkymä jonka kautta voidaan hallita käyttäjätietoja
- `Logout` - Uloskirjautumisen mahdollistava komponentti
- `ChangeUsernameForm` - Käyttäjänimen vaihtamisen lomake
- `ChangePasswordForm` - Salasanan vaihtamisen lomake
- `ThemeToggler` - Sovelluksen teeman vaihtaminen
- `DeleteAccountForm` - Käyttäjätietojen poistamisen lomake
- `NewChatRequest` - Uuden keskustelupyynnön luomisen näkymä (Modal)
- `ChatRequest` - Keskustelupyyntönäkymä
- `ChatPreview` - Keskustelun esikatselukomponentti jota käytetään valikossa keskustelun avaamiseen
- `ChatView` - Yksittäisen keskustelun näkymä
- `Message` - Viestin renderöivä komponentti
- `NewMessageForm` - Uuden viestin luomisen toteuttava komponentti
- `Modal` - Yleiskäyttöinen Modal-komponentti, jota hyödynnetään sovelluksen useissa kohteissa
- `Msgs` - Sovelluksen "parent"-komponentti. Eriytetty App-komponentista toimintalogiikan selkeyttämiseksi.
- `App` - Vastaa teeman määrityksestä sekä sovelluksen sisäisestä reitityksestä


## Asennus

### Userauth-API

1. Asenna riippuvuudet:

   ```bash
   cd /backend/common
   npm install
   cd /backend/userauth
   npm install
   ```

2. Aseta ympäristömuuttujat:

   - `PORT` - Portti johon sovellus julkaistaan
   - `DATABASE_URL` - Postgres-tietokannan yhteysosoite
   - `SECRET` - JWT-salaisuusavain
   - `SALT_ROUNDS` - Salttauskierrosten määrä
   - `FRONTEND_URL` - Frontend sovelluksen osoite (mahdollistaa sähköpostitoimintojen hyödyntämisen)
   - `EMAIL_USER` - Sähköpostilaatikon käyttäjätunnus
   - `EMAIL_PASS` - Sähköpostilaatikon salasana

3. Käynnistä sovellus:

   ```bash
   cd /backend/userauth
   node index.js
   ```

### Chats-API

1. Asenna riippuvuudet:

   ```bash
   cd /backend/common
   npm install
   cd /backend/chats
   npm install
   ```

2. Aseta ympäristömuuttujat:

   - `GQL_PORT` - Portti johon sovellus julkaistaan
   - `DATABASE_URL` - Postgres-tietokannan yhteysosoite
   - `SECRET` - JWT-salaisuusavain
   - `SALT_ROUNDS` - Salttauskierrosten määrä

3. Käynnistä sovellus:

   ```bash
   cd /backend/chats
   node index.js
   ```

### Fronted React-sovellus

1. Asenna riippuvuudet:

   ```bash
   cd /frontend
   npm install
   ```

2. Aseta ympäristömuuttujat:

   - `VITE_USERAUTH_URL` - Käyttäjähallinta-API:n yhteysosoite
   - `VITE_CHATS_URL` - Chats-API:n yhteysosoite
   - `VITE_CHATS_URL` - Chats-API:n websocket-yhteysoosite

3. Käynnistä sovellus dev-rakenteena:

   ```bash
   cd /frontend
   npm run dev
   ```

Nyt viestipalvelun REST-API, GraphQL-API ja React-frontend-sovellus ovat käytettävissä.

## Lisenssi

Tämä projekti on lisensoitu GPL-3.0-lisenssillä. Lisätietoja löytyy [LICENSE](LICENSE)-tiedostosta.

Free software - Hell Yeah!