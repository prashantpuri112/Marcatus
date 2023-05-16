import React from 'react'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const CustomPasswordInput = ({ type, className, onChange, placeholder, defaultValue, defaultChecked, ...otherProps }) => {

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <InputGroup size='md'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                onChange={onChange}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? <FiEye /> : <FiEyeOff />}
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}

export default CustomPasswordInput