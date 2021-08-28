import React from 'react'
import {Form, Input, Button, Checkbox} from 'antd';
import {useFormik} from "formik";


export default function FormUI(props) {
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit(){}
    })
    return (
        <form>

        </form>
    )
   /* return (
        <Form
            {...layout}
            name="basic"
            onFinish={props.submit}
        >
            <Form.Item
                label="Логин"
                labelCol={{offset: 1}}
                name="email"
                type="email"
                colon={false}
                required={false}
                rules={[
                    {
                        required: true,
                        message: 'Это обязательное поле!',
                    },
                ]}
            >
                <Input placeholder={'Введите ваш логин'}/>
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                type={'password'}
                labelCol={{offset: -5}}
                required={false}
                colon={false}
                rules={[
                    {
                        required: true,
                        message: 'Это обязательное поле!',
                    },
                ]}
            >
                <Input.Password placeholder={'Введите пароль'}/>
            </Form.Item>

            <Form.Item
                name="rememberMe"
                valuePropName="checked"
                style={{marginLeft:' 21%',whiteSpace:'nowrap'}}
            >
                <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary"
                        htmlType="submit"
                        shape={'round'}
                        size={'large'}
                >
                    Войти
                </Button>
            </Form.Item>
        </Form>
    )*/
}
