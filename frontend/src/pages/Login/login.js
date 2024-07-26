import styles from './login.module.scss'

import Input from '../../components/input/input'
import Button from '../../components/button/button'
import { Link } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Login () {
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(false)

   
   
    const [formData, setFormData] = useState({
        Email: '',
        Password: ''
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await authService.login(formData.Email,formData.Password);
             localStorage.setItem('token',response.token)
            if (response.token) navigate('/admin/shop')
           
        }
        catch(err) {

        }
        // try {
        //   const response = await authService.login(formData.phone, formData.password);
        //   console.log('Login success:', response);
    
        //   localStorage.setItem('token', response.token);
        //   localStorage.setItem('name', response.name);
        //   localStorage.setItem('id',response.id);
        //   localStorage.setItem('role',response.role);
        // //   localStorage.setItem('id',data.employee_id)
    
        //   // Hiển thị thông báo thành công
        //   toast.success('Đăng nhập thành công!');
        //   navigate('/home')
        // } catch (error) {
        //   console.error('Login error:', error.message);
        //   toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
        //   setIsLoading(false);
        // } finally {
        //   setIsLoading(false);
        // }
      };
      
    return (
        
        <div className={styles.container}>
            <h1>ABCD MALL</h1>
            <form>
                    <Input label={'Email'} name={'Email'} value={formData.Email} onChange={handleChange}/>
                    <Input label={'Mật khẩu'} type={'password'} name={'Password'} value={formData.Password} onChange={handleChange}/>
                    <Button name={'Đăng nhập'} disabled={isLoading} onClick={handleSubmit}></Button>
                    <div className={styles.footerLogin}>
                        <Link to="/register">Đăng ký</Link>
                        <Link to="/forgot">Quên mật khẩu</Link>
                        
                    </div>
            </form>
           
        </div>
    )
}