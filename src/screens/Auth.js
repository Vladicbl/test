import React from "react";
import {connect} from "react-redux";
import AuthActions from "../actions/AuthActions";
import PropTypes from "prop-types";
import {
    ActivityIndicator,
    View,
    StyleSheet
} from "react-native"

const styles = StyleSheet.create({
    processContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
});


class Auth extends React.PureComponent{
    componentDidMount(){
        //метод жизненного цикла, читай документацию
        //как только компонент замонтировался проверим авторизован ли пользователь
        this.checkLogged()
    }

    async checkLogged(){
        if(await this.props.checkToken()){
            //если авторизован то перенаправим пользователя в основную часть приложения
            this.props.navigation.navigate('Main');
        }
    }

    render(){
        const {
            auth
        } = this.props;

        //пока идет проверка авторизации показываем лоудер
        if(auth.loading){
            return(
                <View style={styles.processContainer}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View>
                {
                    //тут рендерим форму авторизации
                }
            </View>
        )
    }
}

// свойства компонента необходимо типизировать, чтобы было меньше ошибок
Auth.propTypes = {
    auth: PropTypes.shape({
        loading: PropTypes.bool,
        accessToken: PropTypes.string
    })
};
// так задаются свойства по-умолчанию
Auth.defaultProps = {
    /*auth: {
        loading: true,
        accessToken: 'example'
    }*/
};


//функция получает на вход глобальный стейт и собственные свойства компонента
//auth - свойство глобального стейта описано в фалйе reducers/index.js
const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
};

//тут все экшены которые будт доступны в компоненте
const actions = {...AuthActions};
//connect() - функция ысшего порядка которая связывает глобальный стейт с компонентом
export default connect(mapStateToProps, actions)(Auth);