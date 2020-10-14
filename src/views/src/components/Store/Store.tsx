import React, { FunctionComponent, useEffect, useState } from 'react';
import './Store.css';
import { loadStore, createStore, loadSingleStore, updateStore, deleteStore, searchStore } from '../../actions/storeActions';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useForm } from 'react-hook-form';
import { showHideLoader } from '../../services/common';
import $ from 'jquery';

/**
 * Store component
 */
const Store:FunctionComponent = () => {

  /**
   * init hooks
   */
  const dispatch = useDispatch();
  const [store, setStore] : any = useState({});
  const [searchQuery, setsearchQuery] : any = useState('');
  const { handleSubmit, register, errors } = useForm();

  /**
   * get data from store
   */
  const storeData = useSelector(state => {
    if ((state as any).storeReducer.loading) {
      showHideLoader('show')
    } else {
      showHideLoader('hide')
    }
    return (state as any).storeReducer;
  }, shallowEqual);

  /**
   * load init store
   */
  useEffect(() => {
    dispatch(loadStore({}));

    if (storeData.singleStore.length !== 0) {
      setStore({
        ...storeData.singleStore[0],
        type: 'edit'
      });
    }
  }, [dispatch,storeData.singleStore]);

  /**
   * Submit the create and update
   * @param values
   */
  const onSubmit = (values : object) => {
    delete (values as any).type;
    if(store.type === 'add') {
      dispatch(createStore(values));
    } else {
      (values as any).id = store.id;
      (values as any).status = store.status;
      dispatch(updateStore(values));
    }
    ($('#myModal') as any).modal('hide');
  };

  /**
   * when click the edit btn
   * @param id number
   */
  const onEdit = (id: number) => {
    dispatch(loadSingleStore({id}));
    ($('#myModal') as any).modal('show');
  };

  /**
   * when click the create btn
   */
  const onCreate = () => {
    setStore({
      type : 'add'
    });
    ($('#myModal') as any).modal('show');
  };

  /**
   * When click the delete btn
   * @param id number
   */
  const onDelete = (id: number) => {
    const prompt = window.confirm('Do you want delete this ?');
    if (prompt)
      dispatch(deleteStore({ id }));
  };

  /**
   * Search input
   * @param event search input
   */
  const onSearch = (event: any) => {
    setsearchQuery(event.target.value);

    if(searchQuery.length > 3) {
      dispatch(searchStore({ name: searchQuery}))
    }

    if (searchQuery.length < 3) {
      dispatch(loadStore({}));
    }
  }

  return (
    <div className='container-fluid'>
      <div className='d-flex justify-content-center'>
        <div className='form-group w-75 mt-4 mb-4'>
          <input type='text' className='form-control p-4' value={searchQuery} onChange={onSearch} placeholder='Search Store'/>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-lg-12 mb-3'>
          <h4>
            <b role='title'>List of store</b>
            <span className='float-right cur-p create-link' onClick={() => onCreate()}>Create Store</span>
          </h4>
        </div>
        {/* looping the store */}
        {storeData.store.map((v: any,k: any) => {
            return (
              <div className='col-lg-4 mb-4' data-testid='store' key={k}>
                <div className='card shadow bg-white'>
                  <div className='card-body'>
                    <h6>
                      <strong className='cur-p'>{v.name}</strong>
                      <i className='fa fa-trash-o ml-3 cur-p float-right' onClick={() => onDelete(v.id)} aria-hidden='true'></i>
                      <i className='fa fa-pencil-square-o cur-p ml-2 float-right' onClick={() => onEdit(v.id)} aria-hidden='true'></i>
                    </h6>
                    <p className='mb-0 mt-1 fs-14'>
                      <i className='fa fa-globe' aria-hidden='true'></i>
                      <span className='ml-1'>{v.street}, {v.state}</span>
                      <i className='fa fa-phone-square ml-3' aria-hidden='true'></i>
                      <span className='ml-1'>{v.phone}</span>
                      <i className='fa fa-share ml-3' aria-hidden='true'></i>
                      <span className='ml-1'><a href={v.domain }>{v.domain}</a></span>
                    </p>
                  </div>
                </div>
              </div>
            )
        })}
        {/* if store is empty */}
        {storeData.store.length === 0 ? (
          <div className='col-lg-12 text-center'>
            <p>Store data is empty</p>
          </div>
        ): (<div/>)}
      </div>
      {/* show the modal for add and update */}
      <div className='modal fade' id='myModal'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>

            <div className='modal-header'>
              <h6 className='modal-title'><b>{store.type === 'add' ? 'Create' : 'Update'} Store</b></h6>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='modal-body'>
                <div className='row'>
                    <div className='col-lg-4'>
                      <div className='form-group'>
                        <label>Store Name:</label>
                        <input type='text' name='name' defaultValue={store.name} className='form-control' placeholder='Enter Store Name' ref={register({
                          required: true,
                          minLength: 3,
                          maxLength: 50
                        })}/>
                      <p className='error-info'>{errors.name && 'Store name is required && mininum is 5 character'}</p>
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='form-group'>
                          <label>Phone-Number:</label>
                          <input type='text' name='phone' defaultValue={store.phone} className='form-control' placeholder='Enter phone number' ref={register({
                            required: true,
                            minLength: 10,
                            maxLength: 15,
                            pattern: {
                              value: /^(\/([0-9]{3}\/)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/,
                              message: 'Phone number should be correct format'
                            }
                          })} />
                      <p className='error-info'>{errors.phone && 'Phone number is required &&  mininum is 5 character && should be correct format  '}</p>
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='form-group'>
                        <label>Street Name:</label>
                        <input type='text' name='street' defaultValue={store.street} className='form-control' placeholder='Enter Street Name' ref={register({
                          required: true,
                          minLength: 5,
                          maxLength: 50
                        })} />
                      <p className='error-info'>{errors.street && 'Street name is required & mininum is 5 character'}</p>
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='form-group'>
                        <label>State Name:</label>
                        <input type='text' name='state' defaultValue={store.state} className='form-control' placeholder='Enter State Name' ref={register({
                          required: true,
                          minLength: 5,
                          maxLength: 50
                        })} />
                      <p className='error-info'>{errors.state && 'State name is required & mininum is 5 character'}</p>
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='form-group'>
                        <label>Domain Name:</label>
                        <input type='text' name='domain' defaultValue={store.domain} className='form-control' placeholder='Enter Domain Name' ref={register({
                          required: true,
                          minLength: 5,
                          maxLength: 50,
                          pattern: {
                            value: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
                            message: 'Phone number should be correct format'
                          }
                        })} />
                      <p className='error-info'>{errors.domain && 'Domain name is required & mininum is 5 character & should be correct'}</p>
                      </div>
                    </div>
                </div>
              </div>

              <div className='modal-footer'>
                <button type='submit' className='btn btn-primary'>{store.type === 'add' ? 'Create' : 'Update'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
