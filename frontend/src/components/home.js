import React, { Component } from 'react'
import axios from 'axios'

class Home extends Component {
    
    state = {
            products:[]
        }
        
    componentDidMount = () => {
        
            axios.get('http://localhost:4200/product/')
            .then( (response) => {
               this.setState({products:response.data})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            })
        
    }

    render () {

        const products = Object
        .keys(this.state.products)
        .map( key => (
                        <tr key={key}>
                            <td><img className="fit-picture" width="180px"
                                        src={this.state.products[key].picture}
                                        alt={this.state.products[key].wording}/>
                            </td>
                            <td>{ this.state.products[key].wording }</td>
                            <td>
                                <button className="btn btn-success edit" >Edit </button>
                                <button className="btn btn-danger delete" >Delete</button>
                                <button className="btn btn-info info" >Details</button>
                            </td>
                        </tr>
            ))

        return (
        <div className="card">
                <div className="card-header">
                    <ul className="nav nav-pills w-100">
                        <li className="nav-pill active">
                            <a className="nav-link">les articles</a>
                        </li>
                        <li className="nav-pill ml-auto">
                            <a className="nav-link active" >Ajouter un article</a>
                        </li>
                    </ul>
                </div>

            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" width="300px">Image</th>
                            <th scope="col">Name</th>
                            <th width="200px">Action</th>
                        </tr>
                    </thead>
                    <tbody> 

                        { products}

                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}

export default Home