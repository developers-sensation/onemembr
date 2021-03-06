import React, {Component} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {loginStyle} from '../styles/Login';
import Logo from '../../assets/img/logo.png';
import {width} from '../styles/dimension';
import {styles} from '../styles/Welcome';
import fb from '../../assets/img/fb.png';
import google from '../../assets/img/google.png';
import twitter from '../../assets/img/twitter.png';
import {connect} from 'react-redux';
import {setAuth} from '../redux/actions';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-number-input';
import {login, sendOtp} from '../api/apis';

interface loginProps {
  setAuth: any;
  navigation: any;
}
interface loginState {
  checked: boolean;
  number: string;
  cCode: string;
  loading: boolean;
  show: boolean
}

// GoogleSignin.configure({
//   webClientId:
//     '997711395093-66p4stfe0ch866pnu02ia5rpunbph8r4.apps.googleusercontent.com',
// });
class Login extends Component<loginProps, loginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      checked: false,
      loading: false,
      cCode: '',
      number: '',
      show: false
    };
  }

  toggleCheckBox = () => {
    this.setState({checked: !this.state.checked});
  };

  handleGoogleLogin = async () => {
    // try {
      // await GoogleSignin.hasPlayServices();
      // const {idToken} = await GoogleSignin.signIn();
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // const res = auth().signInWithCredential(googleCredential);
    //   console.log(res);
    // } catch (error: any) {
    //   console.log(error);
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     return;
    //   } else {
    //     return;
    //   }
    // }
  };
  handleLogin = async () => {
    try {
      this.setState({loading: true});
      const number = this.state.number;
      const loginRes:any = await login({
        phoneNumber: number
      }, true);
      
      if (!loginRes?.data.data) {
        this.setState({loading: false});
        return;
      }
      if (loginRes?.data.isSuccess) {
        const res: any = await sendOtp(number);
        if (res.data.isSuccess) {
          this.props.navigation.navigate('otp', {
            otp: 1234,
            phoneNumber: number,
            to: 'home',
            // _id: "61f9160c5fc353ce1d482146",
            _id: loginRes.data.data._id,
          });
          this.setState({loading: false});
        }
      }
    } catch (error: any) {
      console.log(error.response);
      this.setState({loading: false});
    }
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={65}
        style={loginStyle.container}>
        <View style={loginStyle.logoWrap}>
          <Image source={Logo} style={{width: 50, height: 50}} />
        </View>
        <View
          style={{
            marginTop: 10,
            width: width * 0.8,
          }}>
          <Text
            style={{
              fontSize: 30,
              color: '#2C9BCB',
              fontFamily: 'p-500',
            }}>
            Log in
          </Text>
          {/* <Text
            style={{
              fontFamily: 'p-400',
              color: '#000',
            }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
            deleniti?
          </Text> */}
        </View>
        <View style={loginStyle.formWrap}>
          <View
            style={{
              ...loginStyle.inputBox,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            
            <PhoneInput
            // ref={phoneInput}
            defaultValue={this.state.number}
            defaultCode="IN"
            layout="first"
            autoFocus
            containerStyle={{ height: 70, padding: 0, flex: 1, alignItems: 'center'}}
            textContainerStyle={{...loginStyle.input, flex: 1}}
            onChangeFormattedText={(text: any) => {
              this.setState({number: text});
            }}
          />
          </View>
          <TouchableOpacity
            onPress={this.handleLogin}
            disabled={this.state.number.length < 10}
            style={{
              ...styles.startBtn,
              backgroundColor: '#1FBDBA',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <Text style={{...styles.btnText, color: '#fff'}}>
              {this.state.loading ? 'Please wait...' : 'Sign in'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={loginStyle.optionWrap}>
          <View style={loginStyle.orLine}></View>
          <Text
            style={{
              fontFamily: 'p-500',
              color: '#000',
              marginHorizontal: 12,
            }}>
            OR
          </Text>
          <View style={loginStyle.orLine}></View>
        </View>
        <View style={loginStyle.socialLoginWrap}>
          <View style={loginStyle.socialIcons}>
            <TouchableOpacity onPress={this.handleGoogleLogin}>
              <Image
                source={google}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={fb}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={twitter}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={loginStyle.note}>
          <Text
            style={{
              fontFamily: 'p-500',
              color: '#000',
            }}>
            You are not a member?
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('signup');
            }}>
            <Text
              style={{
                fontFamily: 'p-500',
                color: '#1FBDBA',
                marginLeft: 3,
              }}>
              sign up
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(null, {setAuth})(Login);