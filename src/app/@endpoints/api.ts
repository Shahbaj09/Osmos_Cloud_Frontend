import { environment } from "src/environments/environment"

const baseUrl = environment.baseUrl;
const user = 'user/'
export const api ={
  auth: {
    get signup(){
      return `${baseUrl}${user}create`
    },
    get login(){
      return `${baseUrl}${user}login`
    },
    get verifyEmail(){
      return `${baseUrl}${user}verify`
    },
    get resendVerification(){
      return `${baseUrl}${user}resendVerification`
    },
    get forgotPassword(){
      return `${baseUrl}${user}forgotPassword`
    },
    get resetPassword(){
      return `${baseUrl}${user}resetPassword`
    },
    get verifyPasswordToken(){
      return `${baseUrl}${user}fpToken`
    },
  }
}
