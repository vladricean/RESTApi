<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/vladricean/RESTApi">
    <img src="image.png" alt="Logo" width="80" height="120">
  </a>

  <h3 align="center">REST API - Node.js</h3>

  <p align="center">
    REST API pentru administrarea unui magazin online de rochii de gală.
    <br />
    <a href="https://github.com/vladricean/RESTApi"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/vladricean/RESTApi/issues">Report Bug</a>
    ·
    <a href="https://github.com/vladricean/RESTApi/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#despre-proiect">Despre proiect</a>
      <ul>
        <li><a href="#cu-ce-este-construit">Cu ce este construit</a></li>
      </ul>
    </li>
    <li>
      <a href="#introducere">Introducere</a>
      <ul>
        <li><a href="#cerințe">Cerințe</a></li>
        <li><a href="#instalare">Instalare</a></li>
      </ul>
    </li>
    <li><a href="#aplicatia">Aplicatia</a></li>
    <li><a href="#contributii">Contributii</a></li>
    <li><a href="#concluzii-și-direcții-viitoare">Concluzii și direcții viitoare</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Despre proiect

Am creat un REST API pentru administrarea unui magazin online de rochii de gală. Dorim să ne folosim de o multitudine de operații CRUD pentru un management complex, dar intuitiv pentru magazinul online.

Pentru început am creat un răspuns de GET și POST pentru a adăuga un logo. În cazul în care se introduce un empty  string pentru logo, atunci se returneaza eroarea 418.

### Cu ce este construit

* REST API
* Node.js
* Express


<!-- GETTING STARTED -->
## Introducere

Pentru a avea o copie locală și functională urmați pașii de mai jos.

### Cerințe

* Node.js instalat
Se găsește la linkul următor: https://nodejs.org/en/

### Instalare

Se clonează proiectul
   ```sh
   git clone (https://github.com/vladricean/RESTApi.git)
   ```

<!-- USAGE EXAMPLES -->
## Aplicația

**Pentru a testa operațiile asupra serverului de REST API, ne vom folosi de POSTMAN.**

Pentru început am creat un request de GET în care primim un response status 200 daca serverul intoarce requestul cu success sau 404 daca nu este gasit.

![alt text](https://github.com/vladricean/RESTApi/blob/main/images/getdress.png?raw=true)

Apoi am creat un request de POST pentru a adăuga un logo. 

![alt text](https://github.com/vladricean/RESTApi/blob/main/images/dogLogo.png?raw=true)

În cazul în care se introduce un empty  string pentru logo, atunci se returneaza eroarea 418.

![alt text](https://github.com/vladricean/RESTApi/blob/main/images/postEmpty.png?raw=true)

<!-- CONTRIBUTING -->
## Constributii

Orice fel de contribuții sunt bine primite. Pentru a contribui la proiect faceți fork.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Conclusions and future work

Pe viitor dorim să implementăm operații complexe.

Possibly implement percentage usage of equipment.

<!-- CONTACT -->
## Contact

Ilie Emanuela-Maria - [emanuela.ilie99@e-uvt.ro](emanuela.ilie99@e-uvt.ro)

Ricean Ioan-Vlad - [ioan.ricean95@e-uvt.ro](ioan.ricean95@e-uvt.ro)

Project Link: [https://github.com/vladricean/RESTApi](https://github.com/vladricean/RESTApi)

Materia: Tehnologii Web

Data lansării: 


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/vladricean/RESTApi.svg?style=for-the-badge
[contributors-url]: https://github.com/vladricean/RESTApi/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/vladricean/RESTApi.svg?style=for-the-badge
[forks-url]: https://github.com/vladricean/RESTApi/network/members
[stars-shield]: https://img.shields.io/github/stars/vladricean/RESTApi.svg?style=for-the-badge
[stars-url]: https://github.com/vladricean/RESTApi/stargazers
[issues-shield]: https://img.shields.io/github/issues/vladricean/RESTApi.svg?style=for-the-badge
[issues-url]: https://github.com/vladricean/RESTApi/issues
