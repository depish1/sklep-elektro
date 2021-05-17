import React, { useEffect, useState } from 'react';
import StyledSignIn from './SignIn.styles';
import FormField from 'components/molecules/FormField/FormField';
import HeadlinePrimary from 'components/atoms/HeadlinePrimary/HeadlinePrimary';
import Button from 'components/atoms/Button/Button';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from 'redux/user/index';
import { loaderActions } from 'redux/loader/index';
import firebase from 'firebase.js';
import { redirect } from 'helpers';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const SignIn = ({ user, login, setLoader }) => {
  const [error, setError] = useState(null);
  const history = useHistory();
  useEffect(() => {
    if (user.userData) redirect(null, '/', history);
  }, [history, user.userData]);

  const validate = Yup.object({
    email: Yup.string().email('Wpisz poprawny adres email').required('Email jest wymagany'),
    password: Yup.string().required('Hasło jest wymagane'),
  });

  const handleSubmit = async ({ email, password }) => {
    setLoader(true);
    setError(null);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log(user);
        firebase
          .firestore()
          .collection('usersData')
          .where('uid', '==', user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.id, ' => ', doc.data());
              login({
                uid: user.uid,
                email: user.email,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
              });
              redirect(null, '/', history);
            });
          });
      })
      .catch((error) => {
        console.log(error);
        setError('Login lub hasło nieprawidłowe');
      });
    setLoader(false);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => handleSubmit(values)}
    >
      {(formik) => (
        <StyledSignIn>
          <HeadlinePrimary text="Logowanie" />
          <Form>
            <FormField label="Adres Email:" name="email" type="text" />
            <FormField label="Hasło:" name="password" type="password" />
            <Button isPrimary text="Zaloguj się" type="submit" />
          </Form>
          <p className={error ? 'isVisible' : undefined}>{error}</p>
          <span className="login-text">Nie masz jeszcze konta?</span>
          <Button onClickHandler={(e) => redirect(e, '/signup', history)} text="Zarejestruj się" />
        </StyledSignIn>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (userData) => dispatch(userActions.login(userData)),
  setLoader: (isLoader) => dispatch(loaderActions.setLoader(isLoader)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);