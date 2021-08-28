import React, {useState} from 'react';
import {useFormik} from "formik";
import {Button, Input, Modal, Row} from "antd";
import {toUpperCaseBegin} from "../../Helpers/string-helpers";

export const ChangeContactsModal = ({setVisibility, contacts, setContacts}) => {

    const formik = useFormik({
        initialValues: {
            github: contacts.github,
            vk: contacts.vk,
            facebook: contacts.facebook,
            instagram: contacts.instagram,
            twitter: contacts.twitter,
            website: contacts.website,
            youtube: contacts.youtube,
            mainLink: contacts.mainLink
        },
        onSubmit: (values) => {
            setContacts(values)
            setVisibility(false)
        }
    })
    const cancelHandler = () => {
        setContacts(formik.initialValues)
        setVisibility(false)
    }
    return (
        <Modal
            title="Здесь вы можете именить ссылки на свои соцсети"
            visible={true}
            centered={true}
            closable={false}
            footer={null}
        >
            <form onSubmit={formik.handleSubmit}>
                {
                    Object.keys(formik.values).map((contact, i) => (
                        <Input
                            key={i}
                            name={contact}
                            id={contact}
                            addonBefore={toUpperCaseBegin(contact)}
                            value={formik.values[contact]}
                            onChange={formik.handleChange}
                        />
                    ))
                }
                <Row justify={'space-around'}
                     align={'center'}
                     style={{paddingTop: '10px'}}>
                    <Button type='danger' onClick={cancelHandler} >Отмена</Button>
                    <Button htmlType='submit' type='primary'>Подтвердить</Button>
                </Row>
            </form>
        </Modal>
    )
}
export const TextModal = ({setVisibility, setModalText,defaultValue}) => {
    const {TextArea} = Input;
    const [text, setText] = useState(defaultValue)
    return (
        <Modal
            title="Напишите что-нибудь о себе"
            visible={true}
            centered={true}
            maskClosable={true}
            onCancel={() => setVisibility(false)}
            onOk={() => {
                setModalText(text)
                setVisibility(false)
            }}
            cancelText={'Отмена'}
            okText={'Ок'}
        >
            <TextArea
                allowClear={true}
                maxLength={100}
                showCount={true}
                value={text}
                autoSize={true}
                onChange={(e) => setText(e.target.value)}
                placeholder={'Напишите что-то...'}
            />
        </Modal>
    )
}