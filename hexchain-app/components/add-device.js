import React from 'react'

import { Block } from 'baseui/block'
import { Button } from 'baseui/button'
import { Modal, ModalHeader, ModalBody } from 'baseui/modal'
import { Input } from 'baseui/input'
import { Label2, Paragraph2 } from 'baseui/typography'
import Plus from 'baseui/icon/plus'
import Delete from 'baseui/icon/delete'
import {
  LoadScriptNext,
  Autocomplete,
  GoogleMap,
  Marker
} from '@react-google-maps/api'

import { Formik, Form, Field, FieldArray } from 'formik'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import axios from 'axios'
import { ContextOne } from '../store'

const ADD_DEVICE = gql`
  mutation insert_listdevices(
    $id: String
    $address: String
    $address_blockchain: String
    $created_at: String
    $data_fields: jsonb
    $description: String
    $location: jsonb
    $name: String
    $updated_at: String
    $userId: String
  ) {
    insert_listdevices(
      objects: {
        id: $id
        address: $address
        address_blockchain: $address_blockchain
        created_at: $created_at
        data_fields: $data_fields
        description: $description
        location: $location
        name: $name
        updated_at: $updated_at
        userId: $userId
      }
    ) {
      returning {
        id
      }
    }
  }
`

const libraries = ['places']

export default ({ open, setOpen }) => {
  const { state, dispatch } = React.useContext(ContextOne)
  const [autocomplete, setAutocomplete] = React.useState(null)

  const [address, setAddress] = React.useState('')
  const [location, setLocation] = React.useState({})

  const onLoad = p => {
    setAutocomplete(p)
  }

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      setAddress(autocomplete.getPlace().formatted_address)
      setLocation({
        lat: autocomplete.getPlace().geometry.location.lat(),
        lng: autocomplete.getPlace().geometry.location.lng()
      })
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  return (
    <Mutation mutation={ADD_DEVICE}>
      {(addDevice, { error, loading, data }) => (
        <Block>
          <Modal
            isOpen={open}
            onClose={() => setOpen(!open)}
            overrides={{
              Dialog: {
                style: {
                  // borderTop: '3px solid #ffc107'
                }
              }
            }}
          >
            <Label2
              margin="24px 16px"
              overrides={{
                Block: {
                  style: {
                    textAlign: 'center',
                    fontSize: '24px'
                  }
                }
              }}
            >
              Add new device
            </Label2>
            <ModalBody>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  name: '',
                  description: '',
                  address,
                  location,
                  data_fields: [
                    {
                      field_name: '',
                      field_unit: ''
                    }
                  ]
                }}
                onSubmit={values => {
                  axios
                    .get('http://35.247.179.21:8888/device/create_key')
                    .then(data => {
                      addDevice({
                        variables: {
                          id: data.data.deviceId,
                          address: values.address,
                          address_blockchain: data.data.address_blockchain,
                          created_at: new Date(),
                          data_fields: values.data_fields,
                          description: values.description,
                          location: values.location,
                          name: values.name,
                          updated_at: new Date(),
                          userId: state.auth.user.uid
                        }
                      })
                      console.log(
                        data.data.deviceId,
                        data.data.address_blockchain
                      )
                    })

                    .catch(console.error)
                  console.log(state.auth.user.uid)
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                  }, 500)
                }}
                render={({ values, handleChange }) => (
                  <Form>
                    <Label2 marginBottom="8px">Device Name *</Label2>
                    <Input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      placeholder="eg. hexchain-001"
                      value={values.name}
                    />
                    <Block as="br" />
                    <Label2 marginBottom="8px">Device Description *</Label2>
                    <Input
                      type="text"
                      name="description"
                      onChange={handleChange}
                      placeholder="eg. sensor temperature"
                      value={values.description}
                    />
                    <Block as="br" />
                    <Label2 marginBottom="8px">Location *</Label2>
                    <LoadScriptNext
                      id="script-loader"
                      googleMapsApiKey={process.env.MAP_API}
                      libraries={libraries}
                    >
                      <Autocomplete
                        onLoad={onLoad}
                        onPlaceChanged={onPlaceChanged}
                      >
                        <Input
                          type="text"
                          placeholder="eg. Hexchain Inc., Can Tho, Viet Nam"
                        />
                      </Autocomplete>
                    </LoadScriptNext>

                    <Block as="br" />

                    <Block display="flex" justifyContent="space-between">
                      <Block>
                        <Label2 marginBottom="8px">Latitude *</Label2>
                        <Input
                          type="text"
                          onChange={event =>
                            setLocation({
                              ...location,
                              lat: parseFloat(event.target.value)
                            })
                          }
                          placeholder="eg. 50.88"
                          value={location && location.lat}
                        />
                      </Block>
                      <Block>
                        <Label2 marginBottom="8px">Longitude *</Label2>
                        <Input
                          type="text"
                          onChange={event =>
                            setLocation({
                              ...location,
                              lng: parseFloat(event.target.value)
                            })
                          }
                          placeholder="eg. -12.2"
                          value={location && location.lng}
                        />
                      </Block>
                    </Block>
                    <Block as="br" />
                    <FieldArray
                      name="data_fields"
                      render={arrayHelpers => (
                        <>
                          <Block
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Label2
                              overrides={{
                                Block: {
                                  style: {
                                    fontSize: '20px'
                                  }
                                }
                              }}
                            >
                              Data Fields
                            </Label2>
                            <Block>
                              <Button
                                type="button"
                                shape="round"
                                kind="primary"
                                onClick={() =>
                                  arrayHelpers.push({
                                    field_name: '',
                                    field_unit: ''
                                  })
                                }
                              >
                                <Plus />
                              </Button>
                            </Block>
                          </Block>

                          <Block as="br" />

                          {values.data_fields &&
                            values.data_fields.length > 0 &&
                            values.data_fields.map((data_field, i) => (
                              <div key={i}>
                                <Block
                                  display="flex"
                                  justifyContent="space-between"
                                >
                                  <Block>
                                    <Label2 marginBottom="8px">
                                      Field Name *
                                    </Label2>
                                    <Input
                                      name={`data_fields.${i}.field_name`}
                                      type="text"
                                      onChange={handleChange}
                                      placeholder="eg. temperature"
                                      value={data_field.field_name}
                                    />
                                  </Block>
                                  <Block display="flex" width="220px">
                                    <Block width="150px">
                                      <Label2 marginBottom="8px">
                                        Field Unit *
                                      </Label2>
                                      <Input
                                        name={`data_fields.${i}.field_unit`}
                                        type="text"
                                        onChange={handleChange}
                                        placeholder="eg. ^C"
                                        value={data_field.field_unit}
                                      />
                                    </Block>
                                    <Block
                                      alignSelf="flex-end"
                                      marginLeft="16px"
                                      marginBottom="6px"
                                    >
                                      <Button
                                        disabled={
                                          values.data_fields.length === 1
                                            ? true
                                            : false
                                        }
                                        type="button"
                                        shape="round"
                                        kind="secondary"
                                        onClick={() => arrayHelpers.remove(i)}
                                      >
                                        <Delete />
                                      </Button>
                                    </Block>
                                  </Block>
                                </Block>

                                <Block as="br" />
                              </div>
                            ))}
                        </>
                      )}
                    />
                    <Block as="br" />
                    <Button
                      // disabled={
                      //   email !== '' && password !== '' ? false : true
                      // }
                      // onClick={login(email, password)}
                      type="submit"
                      overrides={{
                        BaseButton: {
                          style: {
                            display: 'flex',
                            width: '100%'
                          }
                        }
                      }}
                    >
                      Add device
                    </Button>
                  </Form>
                )}
              />
            </ModalBody>
          </Modal>
        </Block>
      )}
    </Mutation>
  )
}
