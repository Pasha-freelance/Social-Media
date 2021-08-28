import React from "react";
import {Button, Checkbox, Form as AntdForm, Input,message} from 'antd';
import {Field, Form, Formik} from "formik";

export default function LoginForm(props) {
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const validateEmail = value => {
        if (!value.length) return 'Это поле обязательное'
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) return 'Введите корректный Email'
    }
    const validatePassword = value => {
        if (!value.length) return 'Это поле обязательное'
        if (value.length <= 3) return 'Пароль слишком короткий'
    }


    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false
            }}
            onSubmit={async (values) => {
                const {email, password, rememberMe} = values
                await props.signIn(email, password, rememberMe)
                if(!props.isLoginDataCorrect) message.error("Упс, похоже вы ввели некорректные данные :(")
            }}
        >
            {(props) => (
                <Form>
                    <Field name={'email'} validate={value => validateEmail(value)}>
                        {() => <AntdForm.Item
                            label="Логин"
                            labelCol={{offset: 1}}
                            type="email"
                            colon={false}
                            validateStatus={props.errors.email ? 'error' : ''}
                            help={props.errors.email}
                        >
                            <Input name="email"
                                   placeholder={'Введите ваш логин'}
                                   value={props.values.email}
                                   onChange={props.handleChange}
                                   onBlur={props.handleBlur}
                            />
                        </AntdForm.Item>
                        }
                    </Field>
                    <Field name={'password'} validate={value => validatePassword(value)}>
                        {() => <AntdForm.Item
                            label="Пароль"
                            type={'password'}
                            labelCol={{offset: -5}}
                            colon={false}
                            validateStatus={props.errors.password && props.dirty.password ? 'error' : ''}
                            help={props.errors.password}
                        >
                            <Input.Password name="password"
                                            placeholder={'Введите пароль'}
                                            value={props.values.password}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                            />
                        </AntdForm.Item>
                        }
                    </Field>
                    <AntdForm.Item
                        name="rememberMe"
                        style={{marginLeft: ' 21%', whiteSpace: 'nowrap'}}
                    >
                        <Checkbox name="rememberMe"
                                  checked={props.values.rememberMe}
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                        >Запомнить меня</Checkbox>
                    </AntdForm.Item>

                    <AntdForm.Item {...tailLayout}>
                        <Button type="primary"
                                htmlType="submit"
                                shape={'round'}
                                size={'large'}
                        >
                            Войти
                        </Button>
                    </AntdForm.Item>
                </Form>
            )}
        </Formik>
    )
}
