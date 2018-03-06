
import React from 'react';
import { Formik } from 'formik';
import addTourSubmitDispatch from './add-tour-submit-dispatch';
import * as yup from 'yup';
import { Form, Input, Datepicker, Select, Textarea, Checkbox, DropZone, SubmitBtn} from 'react-formik-ui';

export class AddTourForm extends React.Component {
   
  render() {
     
    const onSubmit = data => (addTourSubmitDispatch(data));

    const  getSchema = () => {
      return yup.object().shape({
        tourTitle: yup
          .string()
          .required('Tour title is required'),
        tourCountry: yup
          .string()
          .required('Tour country is required'),
        tourCity: yup
          .string()
          .required('Tour city is required'),
        tourType: yup
          .string()
          .required('Tour type is required'),
        numberOfDays: yup
        .string()
        .required('Number of Days is required'),
        startDate: yup
        .string()
        .required('Start date is required'),
        maxPeople: yup
        .string()
        .required('Maximum people is required'),
        price: yup
        .string()
        .required('Price is required'),
        currency: yup
        .string()
        .required('Currency is required')
      });
    };
    
    const checkBoxesAmenities = [
      { name: 'allmeals', text: 'All meals' , value: false },
      { name: 'transfers', text: 'Transfers' , value: false },
      { name: 'alcoholicBeverages', text: 'Alcoholic Beverages' , value: false },
      { name: 'flights', text: 'Flights' , value: false },
      { name: 'gratitude', text: 'Gratitude' , value: false }
    ];

    const checkBoxesImages = [
      { name: 'cbImg1', value: false },
      { name: 'cbImg2', value: false },
      { name: 'cbImg3', value: false },
      { name: 'cbImg4', value: false}
    ];
    
    return(
        <Formik
        initialValues={{
          tourTitle: '',
          tourCountry: '',
          tourCity: '',
          tourType: '',
          numberOfDays: '',
          description: '',
          startDate: '',
          maxPeople: '',
          price: '',
          currency: '',
          ...checkBoxesAmenities.reduce((acc, {name, value }) => ({
            ...acc,
            [name]: value,
          }), {}),
          ...checkBoxesImages.reduce((acc, {name, value }) => ({
            ...acc,
            [name]: value,
          }), {}),
          img1: [],
          img2: [],
          img3: [],
          img4: []
        }}
        validationSchema={getSchema}
        onSubmit={onSubmit}
        render={() => {
        return (
          <Form mode='structured'>
            <fieldset>
            <div>
              <b>General Info:</b>
            </div>
            <br/>
                <Input
                  name='tourTitle'
                  placeholder='Tour Title*'
                  required
                />

                <Select
                  name='tourCountry'
                  placeholder='Select a Country*'
                  options={[
                    { value: 'Iceland', label: 'Iceland' },
                    { value: 'Argentina', label: 'Argentina' },
                    { value: 'Phuket', label: 'Phuket' }
                  ]}
                />

                <Select
                  name='tourCity'
                  placeholder='Select a City*'
                  options={[
                    { value: 'Reykjavik', label: 'Reykjavik' },
                    { value: 'Beunoes Aires', label: 'Beunoes Aires' },
                    { value: 'Thailand', label: 'Thailand' }
                  ]}
                />

                <Select
                  name='tourType'
                  placeholder='Tour type*'
                  options={[
                    { value: 'Easy', label: 'Easy' },
                    { value: 'Moderate', label: 'Moderate' },
                    { value: 'Strenuous', label: 'Strenuous' }
                  ]}
                />

                <Select
                  name='numberOfDays'
                  placeholder='Number of days*'
                  options={[
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' }
                  ]}
                />

                <Textarea
                  name='description'
                  placeholder='Short description'
                />

                <Datepicker
                  name='startDate'
                  dateFormat='MM.dd.yyyy'
                  placeholder='Start Date*'
                />

                <Select
                  name='maxPeople'
                  placeholder='Maximum people*'
                  options={[
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' }
                  ]}
                />

                <Input
                  name='price'
                  type='number'
                  placeholder='Price*'
                  required
                />

                <Select
                  name='currency'
                  placeholder='Currency*'
                  options={[
                    { value: 'USD', label: 'USD' },
                    { value: 'EUR', label: 'EUR' },
                    { value: 'GBP', label: 'GBP' }
                  ]}
                />
                
                <p>
                  Check all that is included in this price:
                </p>
                {
                  checkBoxesAmenities.map(cb => (
                    <Checkbox
                      key={cb.name}
                      name={cb.name}
                      text={cb.text}
                    />
                  ))
                }

                <br/> 
                
                <div>
                  <b>Itinerary:</b>
                </div>
                <br/>
                <Textarea
                  name='day1'
                  label='Day 1'
                />

                <Textarea
                  name='day2'
                  label='Day 2'
                />

                {
                  // TODO: Add another day link
                }

                <br/>

                <div>
                  <b>Accomodation</b>
                </div>
                <br/>
                
                <Select
                  name='accomodationDays'
                  label='Day 1'
                  options={[
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' }
                  ]}
                />

                <Textarea
                name='accomodationDay1Desc'
                />

                {
                  // TODO: Add another day link
                }

                <div>
                  <b>Gallery:</b>
                </div>
                <br/>

                <p>
                  Check an image to use for your cover photo:
                </p>
                {
                  checkBoxesImages.map(cb => (
                    <Checkbox
                      key={cb.name}
                      name={cb.name}
                      text={cb.text}
                    />
                  ))
                }

                <DropZone
                  name='img1'
                  style={{
                    width:'75px',
                    height:'75px'
                  }}
                />

                <DropZone
                  name='img2'
                  style={{
                    width:'75px',
                    height:'75px'
                  }}
                />

                <DropZone
                  name='img3'
                  style={{
                    width:'75px',
                    height:'75px'
                  }}
                />

                <DropZone
                  name='img4'
                  style={{
                    width:'75px',
                    height:'75px'
                  }}
                />
                <SubmitBtn />
              </fieldset>
            </Form>
          );
        }}
      />
     );
   }
}