import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="page-footer brown lighten-1">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Графік роботи</h5>
              <p className="grey-text text-lighten-4">
                Понеділок 09:30 - 18:00 Вівторок 09:30 - 18:00 Среда 09:30 -
                18:00 Четвер 09:30 - 18:00 П’ятниця 09:30 - 18:00 Субота 09:30 -
                16:00 Неділя вихідний
              </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Контакти</h5>
              <ul>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    +38 067 696 54 60
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    +38 097 218 71 40
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    м. Олевськ, Житомирська область, Україна
                  </a>
                </li>
                <li>
                  {/* <a className="grey-text text-lighten-3" href="#!">
                    Link 4
                  </a> */}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2014 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#!">
              More Links
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
