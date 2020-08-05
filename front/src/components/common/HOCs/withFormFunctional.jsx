import React, { Component } from 'react';
import axios from 'axios';
import validate from '../validation';

const withFormFunctional = formControls => Comp => {
  return class WithFormFunctional extends Component {
    constructor(props) {
      super(props);
      this.state = {
        formIsValid: false,
        formControls: formControls,
        isLoading: false,
        done: false,
        error: null,
        selectedOption: null,
        data: null,
        allnav : [],
        nav : [],
        subnav : [],
        subsubnav : [],
      };
      console.log(this.state.formControls);
      for (let item in this.state.formControls) {
        const prop = this.state.formControls[item];

        prop.touched = prop.touched || false;
        prop.valid = prop.touched || false;
        if (!prop.validationRules || !prop.validationRules.isRequired) {
          prop.valid = true;
          prop.touched = true;
        }
      }
    }

    componentDidMount =() => {
      let that = this;
      fetch('http://localhost:5000/api/admin/get_cats')
        .then((res) => res.json())
        .then((json) => {
            console.log("Item get in offer",json);
            let nav = json.filter(function(item) {
              return item.pid == 0;
            });
            let subnav = [];
            let subsubnav = [];
            if(this.state.formControls.subcategory.value !== ""){
              subnav = json.filter(function(item) {
                return item.pid == that.state.formControls.category.value.split('__')[0];
              });
            }
            
            if(that.state.formControls.subsubcategory.value !== ""){
              subsubnav = json.filter(function(item) {
                return item.pid == that.state.formControls.subcategory.value.split('__')[0];
              });
            }
            
            that.setState({ allnav: json, nav : nav, subnav:subnav, subsubnav:subsubnav }, function () {
              console.log(that.state)
            });
            // setTimeout(() => {
            // this.setState({ items: json });
            // }, 3000)
        })
        .catch((err) => console.log(err));
    }

    handleErrors = err => {
      const error = err.response.data.message;
      this.setState({ error });
    };

    handleSelectChange = event => {
      console.log(event );
      // this.setState({ selectedOption });
      // console.log(`Option selected:`, selectedOption);
      const updatedControls = {
        ...this.state.formControls
      };
      let formIsValid = true;
      for (let inputIdentifier in updatedControls) {
        formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
      }
      this.setState({
        formControls: updatedControls,
        formIsValid: formIsValid
      });
    };
    
    handleImgChange = event => {
      let that = this;
      const name = event.target.name;
      let value;
      const updatedControls = {
        ...this.state.formControls
      };
      value = name === 'enabled' ? event.target.checked : event.target.files;
      console.log(event );
      const updatedProductForm = {
        ...updatedControls[name]
      };
      updatedProductForm.value = value;
      updatedProductForm.touched = true;
      updatedProductForm.valid = validate(
        value,
        updatedProductForm.validationRules
      );
      updatedControls[name] = updatedProductForm;

      let formIsValid = true;
      for (let inputIdentifier in updatedControls) {
        formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
      }
      console.log(updatedControls);
      this.setState({
        formControls: updatedControls,
        formIsValid: formIsValid,
      }, function() {
        console.log(this.state);
      });
    }

    handleNavChange = event => {
      let that = this;
      const name = event.target.name;
      let value = "";
      let value_name = "";
      let subnav = that.state.subnav;
      let subsubnav = that.state.subsubnav;
      const updatedControls = {
        ...this.state.formControls
      };
      
      if(event.target.value == "") {
        value =
          name === 'enabled' ? event.target.checked : event.target.value;
          subnav = [];
          subsubnav = [];
      }else {
        value =
          name === 'enabled' ? event.target.checked : event.target.value.split('__')[0];
          value_name =
          name === 'enabled' ? event.target.checked : event.target.value.split('__')[1];
        console.log(event );
        // let index = event.target.value.split('__')[0];
        // this.setState({ selectedOption });
        // console.log(`Option selected:`, selectedOption);
        
        if(event.target.name == "category"){
          subnav = that.state.allnav.filter(function(item) {
            return item.pid == value;
          });
          const updatedProductForm1 = {
            ...updatedControls["subcategory"]
          };
          updatedProductForm1.value = "";
          updatedProductForm1.touched = true;
          updatedProductForm1.valid = true;
          updatedControls["subcategory"] = updatedProductForm1;
          const updatedProductForm2 = {
            ...updatedControls["subsubcategory"]
          };
          updatedProductForm2.value = "";
          updatedProductForm2.touched = true;
          updatedProductForm2.valid = true;
          updatedControls["subsubcategory"] = updatedProductForm2;
        }else if(event.target.name == "subcategory"){
          subsubnav = that.state.allnav.filter(function(item) {
            return item.pid == value;
          });
          const updatedProductForm1 = {
            ...updatedControls["subsubcategory"]
          };
          updatedProductForm1.value = "";
          updatedProductForm1.touched = true;
          updatedProductForm1.valid = true;
          updatedControls["subsubcategory"] = updatedProductForm1;
        }
      }
      const updatedProductForm = {
        ...updatedControls[name]
      };
      updatedProductForm.value = value;
      updatedProductForm.touched = true;
      updatedProductForm.valid = validate(
        value,
        updatedProductForm.validationRules
      );
      updatedControls[name] = updatedProductForm;

      const updatedProductForm3 = {
        ...updatedControls[name+'_name']
      };
      updatedProductForm3.value = value_name;
      updatedProductForm3.touched = true;
      updatedProductForm3.valid = validate(
        value_name,
        updatedProductForm3.validationRules
      );
      updatedControls[name+'_name'] = updatedProductForm3;

      let formIsValid = true;
      for (let inputIdentifier in updatedControls) {
        formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
      }
      console.log(updatedControls);
      this.setState({
        formControls: updatedControls,
        formIsValid: formIsValid,
        subnav:subnav,
        subsubnav:subsubnav
      }, function() {
        console.log(this.state);
      });
    };

    handleChange = event => {
       console.log('ok', event.target.value);
      const name = event.target.name;
      let value = '';
      if(name == "sizeList" || name == "colorList"){
        value = [...event.target.selectedOptions].map(o => o.value);
      }else{
        value =
        name === 'enabled' ? event.target.checked : event.target.value;
      }
      

      const updatedControls = {
        ...this.state.formControls
      };

      const updatedProductForm = {
        ...updatedControls[name]
      };

      updatedProductForm.value = value;
      updatedProductForm.touched = true;

      if (name === 'repeatNewPassword') {
        updatedProductForm.valid = validate(
          value,
          updatedProductForm.validationRules,
          this.state.formControls.newPassword.value
        );
      } else {
        updatedProductForm.valid = validate(
          value,
          updatedProductForm.validationRules
        );
      }

      updatedControls[name] = updatedProductForm;

      let formIsValid = true;
      for (let inputIdentifier in updatedControls) {
        formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
      }

      this.setState({
        formControls: updatedControls,
        formIsValid: formIsValid
      });
    };

    handleSubmit = e => {
      console.log(this.props.url)
      e.preventDefault();
      this.setState({ isLoading: true });

      const updatedControls = { ...this.state.formControls };
      let body = {};
      let form = new FormData;
      for (let property in updatedControls) {
        body[property] = updatedControls[property].value;
        if(property == "imageUrl"){
          for (let index = 0; index < updatedControls[property].value.length; index++) {
            form.append('file[]', updatedControls[property].value[index]);
          }
        }else{
          form.append(property, updatedControls[property].value);
        }
        
      }

      // if(body.otherImagesPath.length > 0){
      //   for (let index = 0; index < body.otherImagesPath.length; index++) {
      //     form.append('otherImagesPath[]', body.otherImagesPath[index]);
      //   } 
      // }
      let user = JSON.parse(localStorage.getItem("user"));
      if(user !== undefined && user !== null){
        body.added_by = user._id;
        form.append("added_by", user._id);
        if(user.isAdmin == true){
          body.added_name = "Garmento";
          form.append("added_name", "Garmento");
        }else{
          body.added_name = user.name;
          form.append("added_name", user.name);
        }
      }
      
      //console.log(body);return false;
      if (this.props.method === 'add') {
        const url = this.props.url;
        axios
          .post(url, form)
          .then(res => {
            setTimeout(
              () => this.setState({ isLoading: false, done: true }),
              1000
            );
            setTimeout(() => this.setState({ done: false }), 2000);
            this.setState({ error: null, data: res.data });

            
          })
          .catch(err => {
            this.handleErrors(err);
            setTimeout(() => this.setState({ isLoading: false }), 1000);
          });
      }

      if (this.props.method === 'edit') {
        console.log(this.props.url);
        const url = this.props.url;
        axios
          .put(url, form)
          .then(res => {
            this.setState({ error: null });

            setTimeout(
              () => this.setState({ isLoading: false, done: true }),
              1000
            );
            setTimeout(() => this.setState({ done: false }), 2000);
          })
          .catch(err => {
            this.handleErrors(err);
            setTimeout(() => this.setState({ isLoading: false }), 1000);
          });
      }
    };

    render() {
      return (
        <Comp
          {...this.props}
          {...this.state}
          handleChange={this.handleChange}
          handleNavChange={this.handleNavChange}
          handleImgChange={this.handleImgChange}
          handleSubmit={this.handleSubmit}
        />
      );
    }
  };
};

export default withFormFunctional;
