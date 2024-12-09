import React from 'react';
import Container from 'react-bootstrap/Container';
//import Card from 'react-bootstrap/Card';

const logInForm = () => {
  return (
    <Container fluid className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src="../../public/logIn.jpg" className="rounded-circle" alt="Войти" />
            </div>
            <form className="col-12 col-md-6 mt-3 mt-md-0">
              <h1 className="text-center mb-4">Войти</h1>
              <div className="form-floating mb-3">
                <input name="username" autocomplete="username" required="" placeholder="Ваш ник" id="username" className="form-control" value="" />
                <label for="username">Ваш ник</label>
              </div>
              <div className="form-floating mb-4">
                <input name="password" autocomplete="current-password" required="" placeholder="Пароль" type="password" id="password" className="form-control" value="" />
                <label className="form-label" for="password">Пароль</label>
              </div>
              <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
            </form>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a> // ссылку сделать на страницу регистрации
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default logInForm;