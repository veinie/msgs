# Työaikakirjanpito

| pvm | tunnit | tehtävä |
| --- | ------ | ------- |
|17.3.| 4 | Käyttäjänhallinta-API:n alustus |
|18.3.| 4 | Käyttäjänhallinta-API:n alustus jatkuu|
|19.3.| 4 |  Käyttäjänhallinnan parannusta (palvelinpuolen istunnot & sähköpostin vahvistus) |
|20.3.| 4 | Keskustelu- ja viestimallien lisäys. GraphQL-API:n alustus viesteille. Jaettujen komponenttien uudelleenfaktorointi Common-moduuliin.|
|21.3.| 4 | GraphQL-Scheman ja resolverien määritystä. JWT-happamoitumisen lisäys. ER-diagrammi tietok. rakenteesta.|
|23.3.| 4 | Lisätty extendedSession istunnon keston kasvattamiseksi. Keskustelupyyntöjen ja näiden hyväksymisen lisäys GraphQL-rajapintaan.|
|27.3.| 9 | Fronendin alustus. Lisätty käyttäjä-konteksti, sekä lomakkeet kirjautumiseen ja rekisteröiytymiseen. Pieniä muutoksia userauth-apiin frontendin toimintojen tueksi.|
|28.3.| 9 | Frontendin parannus sovelluksen tilan ja localStoragen käsittelyssä. Lisätty Chat-esikatseluikkunat, Chat-näkymät, lomake uuden viestin lähettämistä varten. Lisäksi käytin todella paljon aikaa GraphQL-subscriptionien määrittämiseen, mutta tämä jatkuu valitettavasti vielä myöhemmin.|
|29.3.| 10 | Subscriptionit keskustelujen uusien viestien reaaliaikaista päivittämistä varten. Frontendin parantelua, lisätty käyttäjähaku uusien keskustelujen aloittamista varten, keskustelunäkymän parantelua, uuden käyttäjän aktivoinnin tuken lisäys käyttöliittymään.|
|1.4. | 4 | Lisätty frontendiin tuki extendedSession-kirjautumiseen. Päivitetty GraphQL-API chat- ja userchat queryiden ja resolvereiden osalta. Lisätty Frontendiin tuki keskustelupyyntöjen hyväksymiselle.|
|2.4. | 10 | Käyttöliittymän päivittelyä. Lisätty responsiivinen valikkorakenne ja päivitetty sivun leiska muiltakin osin paremmin mobiiliystävälliseksi. Lisätty tuki vaalean ja tumman teeman valinnalle. Päivitetty tuki keskustelupyyntöjen hyväksymiselle.|
|3.4. | 3 | Korjattu käyttöliittymäleiskan overflow-ongelmia ja lisätty käyttäjähaku chat-näkymään.|
|3.4. | 10 | Lisätty tokenin päivitysmahdollisuus käyttäjänhallinta-backendiin. Lisätty käyttäjän aktiivisuuden seuranta frontendiin. Lisätty tokenin automaattinen päivittäminen frontendiin, mikäli token on happamoitumassa ja käyttäjä on aktiivinen sovelluksessa.|
|4.4. | 3 | Parannettu frontendin virheidenhallintaa tilanteessa, jossa GraphQL-api palauttaa invalid-token -virheen. Uudelleenfaktoroitu tokenin automaattipäivittäminen yksittäiseen effect-hookkiin. Muutettu ChatView käyttämään välimuistiin ChatPreview-komponentissa haettuja keskustelun käyttäjiä ylimääräisten verkon yli tapahtuvien kutsujen vähentämiseksi. Tarkasteltu vaihtoehtoja ylimääräisten renderöintien välttämiseksi.|
|4.4. | 1 | Lisätty userauth-backendiin mahdollisuus salasanan vaihtamiselle. Päivitetty frontend kirjaamaan käyttäjä ulos sovelluksesta, jos tokenin virkistämistä yritetään vanhentuneella tai virheellisellä tokenilla.|
|5.4. | 8 | Lisätty backendiin ja fronendiin mahdollisuus salasanan ja käyttäjätunnuksen päivittämiseen. GraphQL-API:ssa siirretty keskusteluja koskevien viestien haku erilliseen resolveriin. Uudelleenformatoitu frontendin Apollo-Clienttiä hyödyntämään komponenttien välillä paremmin muistinvaraista cachea ylimääräisen verkkoliikenteen ja toisteisuuden vähentämiseksi. Lisätty uusi animoitu taustaväriluokka fronttiin.|
|6.4. | 12 | Lisätty GraphQL-backendiin ja frontend-sovellukseen uusi subscription keskustelupyyntöjä varten. Siirretty keskustelupyyntöjen hallinta frontendissä Menu-komponenttiin ylimääräisten App-komponenttien renderöinnin välttämiseksi. Muutettu Menu-komponentissa chat-esikatseluiden järjestys siten, että keskustelut, joihin on saapunut viestejä viimeisimpänä, näytetään ensin. Vaihdettu keskustelunäkymän textfield-input contenteditable-diviksi.|
|8.4. | 5 | Lisätty backendiin tuki viestien muokkamiselle ja poistamiselle, sekä näitä hyödyntävät toiminnot frontend-sovellukseen|
|8.4. | 5 | Frontendin elementtien muokkausta.|
|9.4.| 5 | Layoutin mobiiliystävällisen parannus.|
|9.4.| 8 | Lisää frontin muokkausta. Siistitty teemaa ja päivitetty styled-komponentit vastaamaan lopullista toteutusta.|
|9.4.| 2 | Päivitetty Chats-GraphQL-API palauttamaan keskusteluihin liittyvät käyttäjät getUserChats-kutsussa. Lisätty mahdollisuus keskustelupyyntöjen hylkäämiseen ja näihin liittyvien keskustelujen poistoon.|
|10.4.| 5 | Muutettu Chats-api siten, että mikäli uutta keskustelupyyntöä vastaava keskustelu löytyyy tietokannasta valmiiksi, palautetaan aiemman keskustelun tiedot. Päivitetty Frontend asettamaan uuden keskustelupyynnön mukainen keskustelu näkyväksi elementiksi keskustelupyynnön suorittamisen jälkeen.|
|10.4.| 10 | Siiretty frontend-sovelluksessa tieto keskusteluista React-kontekstiin.|
|10.4.| 1 | Korjattu aiemmin syntynyt bugi uusien keskustelupyyntöjen tilauksen toiminnassa ja näihin liittyvän kontekstin määrittelyssä.|
|10.4.| 1 | Käyttöönotettu eslint ja tyylien pakottaminen frontissa.|
|11.4.| 2 | Lisätty eslint ja tyylien pakottaminen backend-rakenteisiin.|
|11.4.| 3 | Parannettu virheenkäsittelyä GraphQL-API:ssa koskien virheellisellä tai puuttuvalla tokenilla lähetettyjä kutsuja, sekä näistä aiheutuvien virheiden käsittelyä frontend-sovelluksessa siten, että käyttäjä kirjataan sovelluksesta automaattisesti ulos silloin, kun kutsuja lähetetään puutteellisella varmenteella.|
|15.4.| 3 | Lisätty userauth-APIin ja frontendiin rakenteet käyttäjätunnuksen poistamista varten.|
|15.4.| 5 | Lisätty sähköpostiosoitteeseen perustuva salasanan palauttamismahdollisuus back- ja frontendiin.|
|15.4.| 1 | Viestinlähetyskomponentin viimeistelyä, mm. Ctrl+Enter viestin lähetys ja komponentin parempi kiinnittäminen näytön alareunaan.|
|15.4.| 2 | Frontendin uudelleenformatointia julkaisua varten.|
|15.4.| 4 | Userauth- ja Chats-API julkaistu Renderiin. Frontin kanssa vielä ongelmia kutsujen uudelleenohjaukseen liittyen.|
|16.4.| 6 | Frontendin julkaisu Renderiin. Tähän liittyen jonkun verran osoitteiden uudelleenmäärittelyä SSL-yhteyksien toiminnan toteuttamiseksi Renderin vaatiman SSL/TLS -yhteyden yli verrattuna paikalliesti ajettuun kehitysympäristöön.|
|16.4.| 4 | Muutamia pieniä frontend-muutoksia, kuten ilmoitus viestin maksimipituuden ylittymisestä, token-autorefresh-flown korjaus, case-sensitiivisyyden poistaminen kirjautumis- ja salasananpalautuslomakkeen sähköpostiosoitesyötteen osalta. Lisäksi lisätty healthcheck-endpointit backend-kohteisiin.|
|17.4.| 2 | Readme-tiedoston päivitys.|
|Yht. |177 | 10op |
