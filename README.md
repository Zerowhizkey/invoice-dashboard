## Deployment

-   How to run this app: \
-   Clone this repo.
-   npm install.
-   "scripts":
    "npm run dev" : Will run the frontend app.

# Kunskapskontroll 2: Invoice-Dashboard-app

## Choice of styling

-   Styled Components:\
    I've chosen styled components as my styling choice for this assignment. I've tried alot of librarys before like MUI, Chakra, Bootstrap.. And i wanted to try something new that in a way contains something similar to vanilla CSS but with another structure, i also want to focus on seperating the css logic to a seperated file for a cleaner view.
-   Google Fonts: \
    Added Poppin font for a nicer font

## Choice of packages

-   vite:\
    I've chosen to work with vite for this project. I have tried diffrent types of packages for an app like NextJS and and basic React App, i feel like vite still contains the least things and is more like a clean start.
-   axios:\
    Axios helps me to API calls with fewer lines of code. I don't need to declare JSON strings back and forth with my calls.
-   uuid:\
    Uuid generates IDs with a long unique string every time it's called on, and that helps me not to worry about having a dubbel of an ID in my code.
-   react-icons:\
    React icons is used because its very simple to use and has alot of variations for icons.
-   dayjs:\
    Dayjs is used to generate and transform date and time. It was very handy to have when I worked with the calendar and timers.
-   timmer-node:\
    Timmer-node is used for starting and stopping timers. It helps create functions like start() and stop() so that I don't have to do it manually.
-   Eslint:\
    I implemented eslint because it helps out to state obious errors, kinda feel like a "must have" in once projects. To put it simple, makes life easier
-   Concurrently:\
    Concurrently helps me write in my script to start both backend and frontend at the same time and on the same terminal, found it very usefull and timesaving.

## Requirements

## En användare ska kunna:

-   Se en lista på tidtagningar de senaste 30 dagarna ()
-   Se en lista på alla tidtagningar (x)
-   Se en lista på projekt (x)
-   Se en lista på tasks (x)
-   Ta bort en tidtagning (x)
-   Ta bort en task (x)
-   Ta bort ett projekt (x)
-   Sätta ett timpris på ett projekt ()
-   Skapa en "faktura" för ett valt projekt och välja tasks som "fakturan" ska innehålla ()
-   Se en lista på "fakturor" och status ()
-   Se en överblicks-sida som visar:
-   Antal projekt (x)
-   Antal tasks (x)
-   Antal "fakturor" ()
-   Tid som loggats de senaste 30 dagarna ()
-   Antalet kronor som fakturerats det senaste året ()

## För att uppnå Godkänt är kraven att:

-   Byggd med Typescript, React som Frontend och json-server. (x)

-   Applikationen ska använda React Context som "Store" för applikations-bred data. (x)

-   Samtliga krav under "En användare ska kunna" är uppfyllda. ()

-   Applikationen ska vara byggd med responsiv design i åtanke.
    (x)

-   En faktura ska innehålla
-   Status (Ej betald, betald, försenad)
-   Förfallodag (30 dagar från datumet vi skapade den)
-   Summa (tid x projektets timpris)
-   Kundens namn ()

-   Listorna ska vara presenterade som tabeller med följande kolumner:
-   Tasks: Namn, Projektets namn (x)
-   Projekt: Namn, antal tasks (x)
-   Fakturor: Kundnamn, status, förfallodatum, summa ()
-   Applikationen ska inte innehålla några "@ts-ignore", typfel och inga implicita any. ()

## För att uppnå Väl Godkänt är kraven att:

-   Applikationen ska inte heller innehålla några explicita any. ()

-   Kunna välja att avrunda tiden uppåt på tasks när man skapar en faktura till närmsta [1 min, 5 min, 15 min, 30 min, 1h].
    (Avrundningen ska ske på varje individuell task, inte på hela fakturan) ()

-   Lägg till stöd för drag n drop för att ändra ordningen på överblicks-infon på överblicks-sidan.
    Samt att kunna visa/dölja info-delar på överblicks-sidan. ()

-   Skapa grafer på överblicks-infon för att visa:
-   En "Line chart" som visar totala mängden tid som loggats de senaste 7 dagarna
-   Valfri chart som visar beloppet som fakturerats i år (per månad) ()
