import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import IMG from "../../asset/background.jpg"
import Logo from '../../asset/Logo.png';
import { add_login } from '../../api/authentication_api'

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
      }
      console.log(res);
      
      resetForm();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='relative'>
      <img src={IMG} alt="" className='h-[100vh] w-[100%]' />

      <div className='bg-opacity-70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[100vh] w-[100%] bg-black'>
        <div className='flex bg-white rounded-xl items-center justify-around shadow-xl p-2 bg-opacity-70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80vh] w-[900px]'>
          <div>
            <div className="rounded-xl p-10 shadow-xl bg-white max-w-md w-full bg-opacity-50">
              
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
                <button className="bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded-full shadow-md hover:bg-gray-100 transition duration-300">
                  <i className="fab fa-google"></i>
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-[#E64D67]">
                  Don’t have an account?  <a href="#" className="text-[#E64D67] hover:underline">Register for free</a>
                </p>
              </div>
            </div>
          </div>
          <div>
            <img src={Logo} alt="" className='w-[400px]' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
