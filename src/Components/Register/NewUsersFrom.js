import React from 'react';
import { connect } from 'react-redux';
import { submitNewUserData } from '../../../actions/registration';
import ValidationMsg from '../ValidationMsg';
import styles from '../register.module.scss';

class NewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: {
        value: '',
        validStatus: '',
        msgClassName: '',
        msg: ''
      },
      lastName: {
        value: '',
        validStatus: '',
        msgClassName: '',
        msg: ''
      },
      title: {
        value: '',
        validStatus: '',
        msgClassName: '',
        msg: ''
      },
      organization: {
        value: '',
        validStatus: '',
        msgClassName: '',
        msg: ''
      },
      department: {
        value: '',
        validStatus: '',
        msgClassName: '',
        msg: ''
      },
      address: {
        value: '',
        validStatus: '',
        msgClassName: '',
        msg: ''
      },
      city: {
        value: '',
        validStatus: '',
        msgClassName: '',
        msg: ''
      },
      country: {
        value: '',
        validStatus: '',
        msgClassName: '',
        msg: ''
      },
      state: {
        value: '',
        validStatus: '',
        msgClassName: '',
        msg: ''
      },
      zip: {
        value: '',
        validStatus: '',
        msgClassName: '',
        msg: ''
      },
      phonenumber: {
        value: '',
        validStatus: '',
        msgClassName: '',
        msg: ''
      },
      wasValidated: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    //this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    let selectedCountry = window.sessionStorage.getItem("selectedCountry");
    let selectedTitle =  window.sessionStorage.getItem("selectedTitle");
    if (selectedCountry) {
      this.setState(prevState => ({country: { value: selectedCountry }}))
    }
    if (selectedTitle) {
      this.setState(prevState => ({title: { value: selectedTitle }}))
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      submitUserData,
      email
    } = this.props;

    // Only enable this to display client-side validation errors.
    this.setState(prevState => ({wasValidated: true}))

    const userData = {
      firstName: this.state.firstName.value,
      lastName: this.state.lastName.value,
      title: this.state.title.value,
      organization: this.state.organization.value,
      department: this.state.department.value,
      address: this.state.address.value,
      city: this.state.city.value,
      state: this.state.state.value,
      country: this.state.country.value,
      zip: this.state.zip.value,
      phonenumber: this.state.phonenumber.value,
    }

    if(this.state.firstName.value &&
      this.state.lastName.value &&
      this.state.title.value &&
      this.state.organization.value &&
      this.state.department.value &&
      this.state.address.value &&
      this.state.city.value &&
      this.state.state.value &&
      this.state.country.value &&
      this.state.zip.value &&
      this.state.phonenumber.value
      ) {
      submitUserData({
        //...this.state,
        ...userData,
        email,
      });
    }
  }

  handleInputChange(e) {
    let targetId = e.target.id;
    let targetValue = e.target.value;
    let validStatus;
    let stateObject;
    if (!targetValue) {
      // The value is empty, so show an error.
      stateObject = {
        [targetId]: {
          'value': targetValue,
          'validStatus': 'isInvalid',
          'msgClassName': 'invalidMsg',
          'msg': 'This is a required field',
        }};
      this.setState(prevState => (stateObject));
    } else {
      stateObject = {
        [targetId]: {
          'value': targetValue,
          'validStatus': 'isValid',
          'msgClassName': 'ValidMsg',
          'msg': '',
        }};
      this.setState(prevState => (stateObject));
    }
  }

  render() {
    const {
      email, submittingData, submissionCompleted, errorMessage, isFatalError,
    } = this.props;

    if (submittingData) {
      return <div className={`${styles.infoBox}`}>Processing your request...</div>;
    }

    if (submissionCompleted) {
      return (
        <div className={`${styles.infoBox} ${styles.success}`}>
          Please check your email for a verification link to continue the registration process.
        </div>
      );
    }

    if (errorMessage !== '' && isFatalError) {
      this.setState(prevState => ({wasValidated: true}));
      return <div className={`${styles.infoBox} ${styles.error}`}>{errorMessage}</div>;
    }
    const {
      firstName,
      lastName,
      title,
      organization,
      department,
      address,
      city,
      state,
      country,
      zip,
      phonenumber,
    } = this.state;
    return (
      <form
        className={`${styles.registerForm} ${this.state.wasValidated && styles.wasValidated}`}
        noValidate
        onSubmit={(e) => this.handleSubmit(e)}
      >
        {/* should style this or whatever if there's an error */}
        {errorMessage !== '' && <div className={`${styles.infoBox} ${styles.error}`}>{errorMessage}</div>}

        <div className="row start-xs center-md">
          <div className="col-xs-12 col-md-6 col-lg-6">
            <label className={styles.formLabel} htmlFor="email">
              Email
            </label>
            <input className={styles.formControl} id="email" type="email" value={email} disabled />
          </div>
        </div>
        <span className={styles.divider} />
        <div className="row center-md">
          <div className="col-xs-12 col-md-6 col-lg-6">
            <div className={styles.formControlGroup}>
              <label className={styles.formLabel} htmlFor="firstName">
                First Name
              </label>
              <input
                className={`${styles.formControl} ${styles[this.state.firstName.validStatus]}`}
                type="text"
                id="firstName"
                required
                value={firstName.value}
                onBlur={(e) => this.handleInputChange(e)}
                onChange={(e) => this.handleInputChange(e)}
              />
              {firstName.msg && <ValidationMsg msgClassName={firstName.msgClassName} msg={firstName.msg} />}
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-6">
            <div className={styles.formControlGroup}>
              <label className={styles.formLabel} htmlFor="lastName">
                Last Name
              </label>
              <input
                className={`${styles.formControl} ${styles[this.state.lastName.validStatus]}`}
                type="text"
                id="lastName"
                required
                value={lastName.value}
                onBlur={(e) => this.handleInputChange(e)}
                onChange={(e) => this.handleInputChange(e)}
              />
              {lastName.msg && <ValidationMsg msgClassName={lastName.msgClassName} msg={lastName.msg} />}
            </div>
          </div>
        </div>
        <div className="row center-md">
          <div className="col-xs-12 col-md-6 col-lg-6">
            <div className={styles.formControlGroup}>
              <label className={styles.formLabel} htmlFor="title">
                Role
              </label>
              <select
                className={`${styles.formControl} ${styles[this.state.title.validStatus]}`}
                id="title"
                value={title.value}
                onBlur={this.handleInputChange.bind(this)}
                onChange={this.handleInputChange.bind(this)}
                required
              >
                <option value="">Select a value</option>
                <option value="Chief Executive Officer or Managing Director">Chief Executive Officer or Managing Director</option>
                <option value="Chief Information Officer">Chief Information Officer</option>
                <option value="Chief Medical Officer">Chief Medical Officer</option>
                <option value="Consumer/Patient/General Public">Consumer/Patient/General Public</option>
                <option value="Department Director, Manager, or Supervisor">Department Director, Manager, or Supervisor</option>
                <option value="Director/VP of Nursing">Director/VP of Nursing</option>
                <option value="Educator">Educator</option>
                <option value="Government Policymaker">Government Policymaker</option>
                <option value="Health Insurer">Health Insurer</option>
                <option value="Legal Professional">Legal Professional</option>
                <option value="Medical Director">Medical Director</option>
                <option value="Medical Librarian">Medical Librarian</option>
                <option value="Nurse/Nurse Practitioner">Nurse/Nurse Practitioner</option>
                <option value="Other">Other</option>
                <option value="Researcher/Analyst">Researcher/Analyst</option>
                <option value="Physician">Physician</option>
                <option value="Physician Assistant">Physician Assistant</option>
                <option value="Publisher">Publisher</option>
                <option value="Student">Student</option>
                <option value="System Administrator">System Administrator</option>
              </select>
              {title.msg && <ValidationMsg msgClassName={title.msgClassName} msg={title.msg} />}
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-6">
            <div className={styles.formControlGroup}>
              <label className={styles.formLabel} htmlFor="organization">
                Organization
              </label>
              <input
                className={`${styles.formControl}  ${styles[this.state.organization.validStatus]}`}
                type="text"
                id="organization"
                required
                value={organization.value}
                onBlur={(e) => this.handleInputChange(e)}
                onChange={(e) => this.handleInputChange(e)}
              />
              {organization.msg && <ValidationMsg msgClassName={organization.msgClassName} msg={organization.msg} />}
            </div>
          </div>
        </div>
        <div className="row center-md">
          <div className="col-xs-12 col-md-6 col-lg-6">
            <div className={styles.formControlGroup}>
              <label className={styles.formLabel} htmlFor="department">
                Department
              </label>
              <input
                className={`${styles.formControl} ${styles[this.state.department.validStatus]}`}
                type="text"
                id="department"
                required
                value={department.value}
                onBlur={(e) => this.handleInputChange(e)}
                onChange={(e) => this.handleInputChange(e)}
              />
              {department.msg && <ValidationMsg msgClassName={department.msgClassName} msg={department.msg} />}
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-6">
            <div className={styles.formControlGroup}>
              <label className={styles.formLabel} htmlFor="address">
                Address
              </label>
              <input
                className={`${styles.formControl} ${styles[this.state.address.validStatus]}`}
                type="text"
                id="address"
                required
                value={address.value}
                onBlur={(e) => this.handleInputChange(e)}
                onChange={(e) => this.handleInputChange(e)}
              />
              {address.msg && <ValidationMsg msgClassName={address.msgClassName} msg={address.msg} />}
            </div>
          </div>
        </div>
        <div className="row center-md">
          <div className="col-xs-12 col-md-6 col-lg-6">
            <div className={styles.formControlGroup}>
              <label className={styles.formLabel} htmlFor="city">
                City
              </label>
              <input
                className={`${styles.formControl} ${styles[this.state.address.validStatus]}`}
                type="text"
                id="city"
                required
                value={city.value}
                onBlur={(e) => this.handleInputChange(e)}
                onChange={(e) => this.handleInputChange(e)}
              />
              {city.msg && <ValidationMsg msgClassName={city.msgClassName} msg={city.msg} />}
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-6">
            <div className={styles.formControlGroup}>
              <label className={styles.formLabel} htmlFor="country">
                Country
              </label>
              <select
                className={`${styles.formControl} ${styles[this.state.country.validStatus]}`}
                id="country"
                required
                value={country.value}
                onBlur={this.handleInputChange.bind(this)}
                onChange={this.handleInputChange.bind(this)}
                autocomplete="off"
              >
                <option value="">Select a value</option>
                <option value="AF">Afghanistan</option>
                <option value="AX">Åland Islands</option>
                <option value="AL">Albania</option>
                <option value="DZ">Algeria</option>
                <option value="AS">American Samoa</option>
                <option value="AD">Andorra</option>
                <option value="AO">Angola</option>
                <option value="AI">Anguilla</option>
                <option value="AQ">Antarctica</option>
                <option value="AG">Antigua and Barbuda</option>
                <option value="AR">Argentina</option>
                <option value="AM">Armenia</option>
                <option value="AW">Aruba</option>
                <option value="AU">Australia</option>
                <option value="AT">Austria</option>
                <option value="AZ">Azerbaijan</option>
                <option value="BS">Bahamas</option>
                <option value="BH">Bahrain</option>
                <option value="BD">Bangladesh</option>
                <option value="BB">Barbados</option>
                <option value="BY">Belarus</option>
                <option value="BE">Belgium</option>
                <option value="BZ">Belize</option>
                <option value="BJ">Benin</option>
                <option value="BM">Bermuda</option>
                <option value="BT">Bhutan</option>
                <option value="BO">Bolivia, Plurinational State of</option>
                <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                <option value="BA">Bosnia and Herzegovina</option>
                <option value="BW">Botswana</option>
                <option value="BV">Bouvet Island</option>
                <option value="BR">Brazil</option>
                <option value="IO">British Indian Ocean Territory</option>
                <option value="BN">Brunei Darussalam</option>
                <option value="BG">Bulgaria</option>
                <option value="BF">Burkina Faso</option>
                <option value="BI">Burundi</option>
                <option value="KH">Cambodia</option>
                <option value="CM">Cameroon</option>
                <option value="CA">Canada</option>
                <option value="CV">Cape Verde</option>
                <option value="KY">Cayman Islands</option>
                <option value="CF">Central African Republic</option>
                <option value="TD">Chad</option>
                <option value="CL">Chile</option>
                <option value="CN">China</option>
                <option value="CX">Christmas Island</option>
                <option value="CC">Cocos (Keeling) Islands</option>
                <option value="CO">Colombia</option>
                <option value="KM">Comoros</option>
                <option value="CG">Congo</option>
                <option value="CD">Congo, the Democratic Republic of the</option>
                <option value="CK">Cook Islands</option>
                <option value="CR">Costa Rica</option>
                <option value="CI">Côte d'Ivoire</option>
                <option value="HR">Croatia</option>
                <option value="CU">Cuba</option>
                <option value="CW">Curaçao</option>
                <option value="CY">Cyprus</option>
                <option value="CZ">Czech Republic</option>
                <option value="DK">Denmark</option>
                <option value="DJ">Djibouti</option>
                <option value="DM">Dominica</option>
                <option value="DO">Dominican Republic</option>
                <option value="EC">Ecuador</option>
                <option value="EG">Egypt</option>
                <option value="SV">El Salvador</option>
                <option value="GQ">Equatorial Guinea</option>
                <option value="ER">Eritrea</option>
                <option value="EE">Estonia</option>
                <option value="ET">Ethiopia</option>
                <option value="FK">Falkland Islands (Malvinas)</option>
                <option value="FO">Faroe Islands</option>
                <option value="FJ">Fiji</option>
                <option value="FI">Finland</option>
                <option value="FR">France</option>
                <option value="GF">French Guiana</option>
                <option value="PF">French Polynesia</option>
                <option value="TF">French Southern Territories</option>
                <option value="GA">Gabon</option>
                <option value="GM">Gambia</option>
                <option value="GE">Georgia</option>
                <option value="DE">Germany</option>
                <option value="GH">Ghana</option>
                <option value="GI">Gibraltar</option>
                <option value="GR">Greece</option>
                <option value="GL">Greenland</option>
                <option value="GD">Grenada</option>
                <option value="GP">Guadeloupe</option>
                <option value="GU">Guam</option>
                <option value="GT">Guatemala</option>
                <option value="GG">Guernsey</option>
                <option value="GN">Guinea</option>
                <option value="GW">Guinea-Bissau</option>
                <option value="GY">Guyana</option>
                <option value="HT">Haiti</option>
                <option value="HM">Heard Island and McDonald Islands</option>
                <option value="VA">Holy See (Vatican City State)</option>
                <option value="HN">Honduras</option>
                <option value="HK">Hong Kong</option>
                <option value="HU">Hungary</option>
                <option value="IS">Iceland</option>
                <option value="IN">India</option>
                <option value="ID">Indonesia</option>
                <option value="IR">Iran, Islamic Republic of</option>
                <option value="IQ">Iraq</option>
                <option value="IE">Ireland</option>
                <option value="IM">Isle of Man</option>
                <option value="IL">Israel</option>
                <option value="IT">Italy</option>
                <option value="JM">Jamaica</option>
                <option value="JP">Japan</option>
                <option value="JE">Jersey</option>
                <option value="JO">Jordan</option>
                <option value="KZ">Kazakhstan</option>
                <option value="KE">Kenya</option>
                <option value="KI">Kiribati</option>
                <option value="KP">Korea, Democratic People&apos;s Republic of</option>
                <option value="KR">Korea, Republic of</option>
                <option value="KW">Kuwait</option>
                <option value="KG">Kyrgyzstan</option>
                <option value="LA">Lao People&apos;s Democratic Republic</option>
                <option value="LV">Latvia</option>
                <option value="LB">Lebanon</option>
                <option value="LS">Lesotho</option>
                <option value="LR">Liberia</option>
                <option value="LY">Libya</option>
                <option value="LI">Liechtenstein</option>
                <option value="LT">Lithuania</option>
                <option value="LU">Luxembourg</option>
                <option value="MO">Macao</option>
                <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                <option value="MG">Madagascar</option>
                <option value="MW">Malawi</option>
                <option value="MY">Malaysia</option>
                <option value="MV">Maldives</option>
                <option value="ML">Mali</option>
                <option value="MT">Malta</option>
                <option value="MH">Marshall Islands</option>
                <option value="MQ">Martinique</option>
                <option value="MR">Mauritania</option>
                <option value="MU">Mauritius</option>
                <option value="YT">Mayotte</option>
                <option value="MX">Mexico</option>
                <option value="FM">Micronesia, Federated States of</option>
                <option value="MD">Moldova, Republic of</option>
                <option value="MC">Monaco</option>
                <option value="MN">Mongolia</option>
                <option value="ME">Montenegro</option>
                <option value="MS">Montserrat</option>
                <option value="MA">Morocco</option>
                <option value="MZ">Mozambique</option>
                <option value="MM">Myanmar</option>
                <option value="NA">Namibia</option>
                <option value="NR">Nauru</option>
                <option value="NP">Nepal</option>
                <option value="NL">Netherlands</option>
                <option value="NC">New Caledonia</option>
                <option value="NZ">New Zealand</option>
                <option value="NI">Nicaragua</option>
                <option value="NE">Niger</option>
                <option value="NG">Nigeria</option>
                <option value="NU">Niue</option>
                <option value="NF">Norfolk Island</option>
                <option value="MP">Northern Mariana Islands</option>
                <option value="NO">Norway</option>
                <option value="OM">Oman</option>
                <option value="PK">Pakistan</option>
                <option value="PW">Palau</option>
                <option value="PS">Palestinian Territory, Occupied</option>
                <option value="PA">Panama</option>
                <option value="PG">Papua New Guinea</option>
                <option value="PY">Paraguay</option>
                <option value="PE">Peru</option>
                <option value="PH">Philippines</option>
                <option value="PN">Pitcairn</option>
                <option value="PL">Poland</option>
                <option value="PT">Portugal</option>
                <option value="PR">Puerto Rico</option>
                <option value="QA">Qatar</option>
                <option value="RE">Réunion</option>
                <option value="RO">Romania</option>
                <option value="RU">Russian Federation</option>
                <option value="RW">Rwanda</option>
                <option value="BL">Saint Barthélemy</option>
                <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                <option value="KN">Saint Kitts and Nevis</option>
                <option value="LC">Saint Lucia</option>
                <option value="MF">Saint Martin (French part)</option>
                <option value="PM">Saint Pierre and Miquelon</option>
                <option value="VC">Saint Vincent and the Grenadines</option>
                <option value="WS">Samoa</option>
                <option value="SM">San Marino</option>
                <option value="ST">Sao Tome and Principe</option>
                <option value="SA">Saudi Arabia</option>
                <option value="SN">Senegal</option>
                <option value="RS">Serbia</option>
                <option value="SC">Seychelles</option>
                <option value="SL">Sierra Leone</option>
                <option value="SG">Singapore</option>
                <option value="SX">Sint Maarten (Dutch part)</option>
                <option value="SK">Slovakia</option>
                <option value="SI">Slovenia</option>
                <option value="SB">Solomon Islands</option>
                <option value="SO">Somalia</option>
                <option value="ZA">South Africa</option>
                <option value="GS">South Georgia and the South Sandwich Islands</option>
                <option value="SS">South Sudan</option>
                <option value="ES">Spain</option>
                <option value="LK">Sri Lanka</option>
                <option value="SD">Sudan</option>
                <option value="SR">Suriname</option>
                <option value="SJ">Svalbard and Jan Mayen</option>
                <option value="SZ">Swaziland</option>
                <option value="SE">Sweden</option>
                <option value="CH">Switzerland</option>
                <option value="SY">Syrian Arab Republic</option>
                <option value="TW">Taiwan, Province of China</option>
                <option value="TJ">Tajikistan</option>
                <option value="TZ">Tanzania, United Republic of</option>
                <option value="TH">Thailand</option>
                <option value="TL">Timor-Leste</option>
                <option value="TG">Togo</option>
                <option value="TK">Tokelau</option>
                <option value="TO">Tonga</option>
                <option value="TT">Trinidad and Tobago</option>
                <option value="TN">Tunisia</option>
                <option value="TR">Turkey</option>
                <option value="TM">Turkmenistan</option>
                <option value="TC">Turks and Caicos Islands</option>
                <option value="TV">Tuvalu</option>
                <option value="UG">Uganda</option>
                <option value="UA">Ukraine</option>
                <option value="AE">United Arab Emirates</option>
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
                <option value="UM">United States Minor Outlying Islands</option>
                <option value="UY">Uruguay</option>
                <option value="UZ">Uzbekistan</option>
                <option value="VU">Vanuatu</option>
                <option value="VE">Venezuela, Bolivarian Republic of</option>
                <option value="VN">Viet Nam</option>
                <option value="VG">Virgin Islands, British</option>
                <option value="VI">Virgin Islands, U.S.</option>
                <option value="WF">Wallis and Futuna</option>
                <option value="EH">Western Sahara</option>
                <option value="YE">Yemen</option>
                <option value="ZM">Zambia</option>
                <option value="ZW">Zimbabwe</option>
              </select>
              {country.msg && <ValidationMsg msgClassName={country.msgClassName} msg={country.msg} />}
            </div>
          </div>
        </div>
        <div className="row center-md">
          <div className="col-xs-12 col-md-6 col-lg-6">
            <div className={styles.formControlGroup}>
              <label className={styles.formLabel} htmlFor="state">
                State or Province
              </label>
              <input
                className={`${styles.formControl} ${styles[this.state.state.validStatus]}`}
                type="text"
                id="state"
                required
                value={state.value}
                onBlur={(e) => this.handleInputChange(e)}
                onChange={(e) => this.handleInputChange(e)}
              />
              {state.msg && <ValidationMsg msgClassName={state.msgClassName} msg={state.msg} />}
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-6">
            <div className={styles.formControlGroup}>
              <label className={styles.formLabel} htmlFor="zip">
                Postal Code
              </label>
              <input
                className={`${styles.formControl} ${styles[this.state.zip.validStatus]}`}
                type="zip"
                id="zip"
                required
                value={zip.value}
                onBlur={(e) => this.handleInputChange(e)}
                onChange={(e) => this.handleInputChange(e)}
              />
              {zip.msg && <ValidationMsg msgClassName={zip.msgClassName} msg={zip.msg} />}
            </div>
          </div>
        </div>
        <div className="row center-md">
          <div className="col-xs-12 col-md-6 col-lg-6">
            <div className={styles.formControlGroup}>
              <label className={styles.formLabel} htmlFor="phonenumber">
                Phone Number
              </label>
              <input
                className={`${styles.formControl} ${styles[this.state.phonenumber.validStatus]}`}
                type="phone"
                id="phonenumber"
                required
                value={phonenumber.value}
                onBlur={(e) => this.handleInputChange(e)}
                onChange={(e) => this.handleInputChange(e)}
              />
              {phonenumber.msg && <ValidationMsg msgClassName={phonenumber.msgClassName} msg={phonenumber.msg} />}
            </div>
          </div>
        </div>
        <div className="row end-xs center-md">
          <div className="col-xs-3 center-md">
            <button type="submit" className={styles.formSubmit}>
              Sign Up
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  submitUserData: userData => dispatch(submitNewUserData(userData)),
});

const mapStateToProps = state => ({
  ...state.registration.signUp,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewUserForm);
