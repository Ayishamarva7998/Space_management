
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import IMG from "../../asset/background.jpg"
import Logo from '../../asset/Logo.png';
import { add_login } from '../../api/authentication_api'
import { toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
});

const Login = () => {

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await add_login(values)
      if(res){
        localStorage.setItem("token",res.data.token)
        toast.success(res.data.message);
      }
      console.log(res);
      
      resetForm();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  return (
    <div className='relative'>
  
      <img src={IMG} alt="" className='h-[100vh] w-[100%]' />

      <div className='bg-opacity-70 absolute top-0 left-0 h-full w-full bg-black flex items-center justify-center'>
        <div className='flex flex-col md:flex-row bg-white rounded-xl items-center justify-around shadow-xl p-4 bg-opacity-70 h-auto w-[90%] md:w-[900px]'>

          <div className='mb-6 md:mb-0 order-1 md:order-2 w-full md:w-1/2 flex justify-center'>
            <img src={Logo} alt="Logo" className='w-[200px] md:w-[400px] max-w-full' />
          </div>

      
          <div className='w-full md:w-1/2 order-2 md:order-1'>
            <div className="rounded-xl p-6 md:p-10 shadow-xl bg-white bg-opacity-50">
              
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}  
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form>
                    <div className="mb-5">
                      <label className="block text-sm font-semibold mb-2 text-[#E64D67]">Email</label>
                      <Field
                        type="email"
                        name="email"
                        autoComplete="email"
                        className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black-300 transition duration-300 ${
                          touched.email && errors.email ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter your email"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-semibold mb-2 text-[#E64D67]">Password</label>
                      <Field
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black-300 transition duration-300 ${
                          touched.password && errors.password ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter your password"
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="flex items-center justify-between mb-8">
                      <a href="#" className="text-sm text-[#E64D67] hover:underline">Forgot Password?</a>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0E2145] text-white py-3 px-4 rounded-lg hover:bg-white-900 focus:outline-none focus:ring-2 focus:ring-black- transition duration-300 font-semibold"
                      disabled={isSubmitting}
                    >
                      Sign in
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="mt-8 flex items-center justify-center space-x-4">
                
              </div>

              <div className="mt-6 text-center">
                <p className="text-[#E64D67]">
                  Don’t have an account?  <a href="#" className="text-[#E64D67] hover:underline">Register for free</a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login;
