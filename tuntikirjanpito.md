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