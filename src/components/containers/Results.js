import React, { Component } from 'react'
import { Item } from '../presentation'
import Dropzone from 'react-dropzone'
import { Modal } from 'react-bootstrap'
import turbo from 'turbo360'
import { connect } from 'react-redux'
import actions from '../../actions'

class Results extends Component {
  constructor() {
    super()
    this.state = {
      showModal: false,
      item: {},
      order: {

      }
    }
  }

  componentDidMount() {
    this.props.fetchItems()
  }

  updateItem(attr, event) {
    event.preventDefault()
    let updated = Object.assign({}, this.state.item)
    updated[attr] = event.target.value
    this.setState({item: updated})
  }

  addItem(event) {
    event.preventDefault()
    if (this.props.account.currentUser == null) {
      alert('Please log in or register to sell items')
      return
    }

    const currentUser = this.props.account.currentUser
    let updated = Object.assign({}, this.state.item)
    updated['position'] = this.props.map.currentLocation
    updated['seller'] = {
      id: currentUser.id,
      username: currentUser.username,
      image: currentUser.image || ''
    }
    // console.log('ADD ITEM:', JSON.stringify(updated));
    this.props.addItem(updated)
      // .then(data => {
      //   console.log('ITEM ADDED:', JSON.stringify(data))
      // })
      // .catch(err => {
      //   console.log('ERROR:', err.message)
      // })
  }

  uploadImage(files) {
    const image = files[0]
    // console.log('uploadImage:',image.name);
    const turboClient = turbo({
      site_id: '5a104f3beaac0e0014b0f81e'
    })
    turboClient.uploadFile(image)
      .then(data => {
        // console.log('FILE UPLOADED:', data.result.url);
        let updated = Object.assign({}, this.state.item)
        updated['image'] = data.result.url
        this.setState({
          item: updated
        })
      })
      .catch(err => {
        console.log('UPLOAD ERROR:', err.message)
      })
  }

  onPurchase(item, event) {
    event.preventDefault()
    this.setState({
      showModal: true,
      selectedItem: item
    })
  }

  updateOrder(event) {
    // console.log('updateOrder:',event.target.value)
    let updated = Object.assign({}, this.state.order)
    updated['message'] = event.target.value
    this.setState({
      order: updated
    })
  }

  submitOrder(event) {
    let updated = Object.assign({}, this.state.order)
    updated['item'] = this.state.selectedItem
    updated['buyer'] = {
      id: this.props.account.currentUser.id,
      username: this.props.account.currentUser.username,
      email: this.props.account.currentUser.email
    }
    // console.log('submitOrder:',{updated})
    this.props.submitOrder(updated)
      .then(data => {
        const email = {
          fromemail: 'travis.shields@gmail.com',
          fromname: 'Garage Sale!',
          subject: 'You got a Purchase Order!',
          content: updated.message,
          recipient: 'travis.shields@gmail.com'
        }
        return this.props.sendEmail(email)
      })
      .then(data => {
        alert('Your order has been submitted.')
        this.setState({
          showModal: false
        })
      })
      .catch(err => {
        alert('OOPS: ' + err.message)
      })
  }

  render() {
    // console.log(this.props);
    const items = this.props.item.all || []
    return (
      <div className="container-fluid">
        <div className="row">
          {
            items.map((item, i) => {
              return <Item key={item.id} item={item} onPurchase={this.onPurchase.bind(this, item)} />
            })
          }
        </div>

          <div className="row">
            <div className="col-md-4">
              <div className="card">
                  <div className="content">
                      <div className="footer">
                          <h3>Add Item</h3>
                          <input onChange={this.updateItem.bind(this, 'name')} type="text" style={localStyle.input} className="form-control" placeholder="Name" />
                          <input onChange={this.updateItem.bind(this, 'price')} type="text" style={localStyle.input} className="form-control" placeholder="Price" />
                          { (this.state.item.image == null) ? null : <img src={this.state.item.image+'=s120-c'} /> }
                          <hr />
                          <div className="stats">
                              <Dropzone onDrop={this.uploadImage.bind(this)} className="btn btn-info btn-fill" style={{marginRight:16}}>Add Image</Dropzone>
                              <button onClick={this.addItem.bind(this)} className="btn btn-success">Add Item</button>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
          <Modal bsSize="sm" show={this.state.showModal} onHide={ () => {this.setState({showModal:false})} }>
              <Modal.Body style={localStyle.modal}>
                  <h3>Purchase Item</h3>
                  <hr />
                  <textarea onChange={this.updateOrder.bind(this)} style={localStyle.textarea} placeholder="Enter Message Here" className="form-control"></textarea>
                  <button onClick={this.submitOrder.bind(this)} className="btn btn-success btn-fill">Purchase!</button>
              </Modal.Body>
          </Modal>
      </div>
    )
  }
}

const localStyle= {
  input: {
    border: '1px solid #ddd',
    marginBottom: 12
  },
  textarea: {
    border: '1px solid #ddd',
    height: 160,
    marginBottom: 16
  }
}

const stateToProps = (state) => {
  return {
    item: state.item,
    map: state.map,
    account: state.account
  }
}

const dispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(actions.addItem(item)),
    fetchItems: (params) => dispatch(actions.fetchItems(params)),
    submitOrder: (order) => dispatch(actions.submitOrder(order)),
    sendEmail: (email) => dispatch(actions.sendEmail(email))
  }
}
 
export default connect(stateToProps, dispatchToProps)(Results)