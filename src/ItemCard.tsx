import axios from 'axios';
import * as React from 'react';
import { Button, Card, Form, Icon, Image, Input, Item, Modal } from 'semantic-ui-react';
// import { sendDataByEmail } from './backend';

interface ItemCardProps {
    name: string;
    img: string;
    price: string;
}

export class ItemCard extends React.Component<ItemCardProps> {
    itemProps = { name: this.props.name, img: this.props.img, price: this.props.price };
    render() {
        return (
            <Card centered style={{ margin: '12px' }}>
                <Image src={this.props.img} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{this.props.name}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        {this.props.price}
                        <Icon name='ruble' />
                    </a>
                </Card.Content>
                <ModalExampleMultiple props={this.itemProps} />
            </Card>
        )
    }
}

function ModalExampleMultiple(props: any) {
    const [firstOpen, setFirstOpen] = React.useState(false)
    const [secondOpen, setSecondOpen] = React.useState(false)
    const state = {
        name: "",
        phone: "",
        email: "",
        item: props.props.name + ", " + props.props.price + " рублей"
    }


    function inputFieldsValidate(name: string, phone: string, email: string, item: string) {
        if (name) {
            if (phone) {
                if (email) {
                    if (item) {
                        return true
                    }
                } else {
                    alert("Please enter a valid email address")
                }
            } else {
                alert("Please enter your phone number")
            }
        } else {
            alert("Please enter your name")
        }
    }

    async function handleSubmit(name: string, phone: string, email: string, item: string) {
        const response = await axios.post('http://localhost:3001/sendMail', {
            name: name,
            phone: phone,
            email: email,
            item: item
        })
        console.log(response)
    }

    return (
        <>
            <Button basic color="red" onClick={() => setFirstOpen(true)}>Купить</Button>

            <Modal
                onClose={() => setFirstOpen(false)}
                onOpen={() => setFirstOpen(true)}
                open={firstOpen}
            >
                <Modal.Header>Введите данные</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-first-name'
                                    control={Input}
                                    label='Имя'
                                    placeholder='Имя'
                                    onChange={(e: any) => state.name = e.target.value}
                                />
                            </Form.Group>

                            <Form.Field
                                id='form-input-control-phone'
                                control={Input}
                                label='Телефон'
                                placeholder='+7(xxx)xxx-xx-xx'
                                onChange={(e: any) => state.phone = e.target.value}
                            />
                            <Form.Field
                                id='form-input-control-error-email'
                                control={Input}
                                label='Почта'
                                placeholder='exmple@email.com'
                                onChange={(e: any) => state.email = e.target.value}
                            />
                        </Form>
                        <Item.Group>
                            <Item>
                                <Item.Image size='tiny' src={props.props.img} />
                                <Item.Content header={props.props.name} meta={props.props.price} />
                            </Item>
                        </Item.Group>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" onClick={() => {
                        // console.log(state)
                        setFirstOpen(false)
                    }} colored>
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        console.log(state)
                        const validateResult = inputFieldsValidate(state.name, state.phone, state.email, state.item)
                        if(validateResult){
                        handleSubmit(state.name, state.phone, state.email, state.item)
                        setSecondOpen(true)
                        }
                    }} primary>
                        Proceed <Icon name='chevron right' />
                    </Button>
                </Modal.Actions>

                <Modal
                    onClose={() => setSecondOpen(false)}
                    open={secondOpen}
                    size='small'
                >
                    <Modal.Header>Success</Modal.Header>
                    <Modal.Content>
                        <p>Данные отправлены на вашу почту!</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            icon='check'
                            content='All Done'
                            onClick={() => {
                                setSecondOpen(false)
                                setFirstOpen(false)
                            }}
                        />
                    </Modal.Actions>
                </Modal>
            </Modal>
        </>
    )
}