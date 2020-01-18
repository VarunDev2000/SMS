import React from 'react';
import { Form, Input, Button } from 'antd';
import CustomLayout from '../Layout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 
import { editEmployment,getEmploymentbyID,deleteEmployment } from '../../actions/employment';

class EmpEdit extends React.Component {
  
  state = {
    employment:{},
    emp:{},
    redirect : false,

    designation: '',
    from_date: '',
    to_date: '',
    department: '',
    campus: '',
    present_pay: '',
    nature_of_app: '',
    position: '',
    position_type: '',
    scale_of_pay: '',
    institution: '',
    years: '',
    exp_type: '',
    emp_type: '',
}

static propTypes = {
  editEmployment: PropTypes.func.isRequired,
  employment: PropTypes.object.isRequired,
  deleteEmployment: PropTypes.func.isRequired,
}

onChange = e => {
  if(e.target.value === "")
  {
    this.setState({
      [e.target.name]: null
    });
  }

  else{
    this.setState({
      [e.target.name]: e.target.value
    });
  }
}

delete = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    var conf = window.confirm("Do you want to delete ?");
    if (conf === true) {
      this.props.deleteEmployment(id);
      window.open('/employment',"_self");
      //history.push('/qualification');
    } 
}


onSubmit = e => {

    const id = this.props.match.params.id;

    e.preventDefault();

    if(this.state.emp_type === 'univ')
    {
      //console.log(this.state.univ_emp_form);
      if(this.state.position_type === "present")
      {
        const {designation,from_date,department,campus,scale_of_pay,present_pay,nature_of_app,position_type,emp_type} = this.state;
      
        const emp_info = {designation,from_date,department,scale_of_pay,campus,present_pay,nature_of_app,position_type,emp_type};
  
            
        //console.log(emp_info);
        this.props.editEmployment(emp_info,id);
        window.open('/employment',"_self");
      }
  
      else if(this.state.position_type === "prev")
      {
        if(this.state.from_date > this.state.to_date)
        {
          alert("Invalid Duration!!")
        }
        else{
          const {designation,from_date,to_date,department,campus,nature_of_app,position_type,emp_type} = this.state;
        
          const emp_info = {designation,from_date,to_date,department,campus,nature_of_app,position_type,emp_type};
    
              
          //console.log(emp_info);
          this.props.editEmployment(emp_info,id);
          window.open('/employment',"_self");
        }
      }
  
      else if(this.state.position_type === "present_add")
      {
        const {department,position,from_date,position_type,emp_type} = this.state;
      
        const emp_info = {department,position,from_date,position_type,emp_type};
  
            
        //console.log(emp_info);
        this.props.editEmployment(emp_info,id);
        window.open('/employment',"_self");
      }
  
      else if(this.state.position_type === "prev_add")
      {
        if(this.state.from_date > this.state.to_date)
        {
          alert("Invalid Duration!!")
        }
        else{
          const {department,position,from_date,to_date,position_type,emp_type} = this.state;
        
          const emp_info = {department,position,from_date,to_date,position_type,emp_type};
    
              
          //console.log(emp_info);
          this.props.editEmployment(emp_info,id);
          window.open('/employment',"_self");
        }
      }
      
    }
      else if(this.state.emp_type === "oth")
      {
        const {designation,institution,years,emp_type,exp_type} = this.state;
      
        const emp_info = {designation,institution,years,emp_type,exp_type};
  
            
        //console.log(emp_info);
        this.props.editEmployment(emp_info,id);
        window.open('/employment',"_self");
      }
  
    else{
    }
}


setStates(props)
{
  if(props.employment.emp_type === 'univ')
    {
      if(props.employment.position_type === "present")
      {
        this.setState({
          designation : props.employment.designation,
          from_date : props.employment.from_date,
          department : props.employment.department,
          campus : props.employment.campus,
          present_pay : props.employment.present_pay,
          scale_of_pay : props.employment.scale_of_pay,
          nature_of_app : props.employment.nature_of_app,
          position_type : props.employment.position_type,
          emp_type : props.employment.emp_type,
        })
      }
  
      else if(props.employment.position_type === "prev")
      {
        this.setState({
          designation : props.employment.designation,
          from_date : props.employment.from_date,
          to_date : props.employment.to_date,
          department : props.employment.department,
          campus : props.employment.campus,
          nature_of_app : props.employment.nature_of_app,
          position_type : props.employment.position_type,
          emp_type : props.employment.emp_type,
        })
      }
  
      else if(props.employment.position_type === "present_add")
      {
        this.setState({
          department : props.employment.department,
          position : props.employment.position,
          from_date : props.employment.from_date,
          position_type : props.employment.position_type,
          emp_type : props.employment.emp_type,
        })
      }

      else if(props.employment.position_type === "prev_add")
      {
        this.setState({
          department : props.employment.department,
          position : props.employment.position,
          from_date : props.employment.from_date,
          to_date : props.employment.to_date,
          position_type : props.employment.position_type,
          emp_type : props.employment.emp_type,
        })
      }
      
    }
      else if(props.employment.emp_type === "oth")
      {
        this.setState({
          designation : props.employment.designation,
          institution : props.employment.institution,
          years : props.employment.years,
          emp_type : props.employment.emp_type,
          exp_type : props.employment.exp_type,
        })
      }
  
    else{
    }
}

componentDidMount()
{    
  const id = this.props.match.params.id;
  this.props.getEmploymentbyID(id);
}


componentWillReceiveProps(props) {
    this.setStates(props);
    this.setState({
      emp : props.employment
    })
}


  render() { 
    var emp = this.state.emp;
    var emp_len = Object.keys(emp).length;

    return (
      <div>
      <CustomLayout>
        {
        emp_len > 0 ? (
          <div>
  
          <Form onSubmit ={this.onSubmit}>
          {
          emp.emp_type === 'univ' && emp.position_type === 'present' ? (null) : (
          <div align="right">
            <Button type="danger" htmlType = "submit" onClick = {this.delete}>Delete</Button>
            <br/>
          </div>
          )
          }

          {
            emp.emp_type === 'univ' ? (
            <div>
            {
            emp.position_type === "present" ? (
              <div>
              <Form.Item label="DESIGNATION">
              <Input name = "designation" placeholder="Enter Designation" required defaultValue = {emp.designation} onChange = {this.onChange} />
              </Form.Item>
              <Form.Item label="FROM">
                <input type = "date" name = "from_date" required defaultValue = {emp.from_date} onChange = {this.onChange} ></input>
              </Form.Item>
              <Form.Item label="DEPARTMENT/CENTRE">
                <select name="department" defaultValue={emp.department} onChange = {this.onChange}>
                  <option value="">None</option>
                  <option value="ADDITIONAL CONTROLLER OF EXAMINATION">ADDITIONAL CONTROLLER OF EXAMINATION</option>
                  <option value="Administrative Office">Administrative Office</option>
                  <option value="Alagappa College of Technology">Alagappa College of Technology</option>
                  <option value="Anna University">Anna University</option>
                  <option value="Anna University Sport Board">Anna University Sport Board</option>
                  <option value="AU-FRG Institute for CAD/CAM">AU-FRG Institute for CAD/CAM</option>
                  <option value="AU-KBC Research Centre">AU-KBC Research Centre</option>
                  <option value="AU-RU Urban Energy Centre">AU-RU Urban Energy Centre</option>
                  <option value="AU-TVS Centre for Quality Management">AU-TVS Centre for Quality Management</option>
                  <option value="Audio Visual Research Centre">Audio Visual Research Centre</option>
                  <option value="Boys Hostel">Boys Hostel</option>
                  <option value="Building Technology Centre">Building Technology Centre</option>
                  <option value="Centre for Academic Courses">Centre for Academic Courses</option>
                  <option value="Centre for Admissions">Centre for Admissions</option>
                  <option value="Centre for Aerospace Research">Centre for Aerospace Research</option>
                  <option value="Centre for Affliation of Institutions">Centre for Affliation of Institutions</option>
                  <option value="Centre for Alumni Affairs">Centre for Alumni Affairs</option>
                  <option value="Centre for Applied Research in Indic Technologies">Centre for Applied Research in Indic Technologies</option>
                  <option value="Centre for Bio Technology">Centre for Bio Technology</option>
                  <option value="Centre for Climate Change and Adaptation Research">Centre for Climate Change and Adaptation Research</option>
                  <option value="Centre for Development of Tamil in Engineering & Technology">Centre for Development of Tamil in Engineering & Technology</option>
                  <option value="Centre for Disaster Mitigation and Management">Centre for Disaster Mitigation and Management</option>
                  <option value="Centre for Distance Education">Centre for Distance Education</option>
                  <option value="Centre for Empowerment of Women">Centre for Empowerment of Women</option>
                  <option value="Centre for Enterpreneurship Development">Centre for Enterpreneurship Development</option>
                  <option value="Centre for Entrance Examinations">Centre for Entrance Examinations</option>
                  <option value="Centre for Environmantal Studies">Centre for Environmantal Studies</option>
                  <option value="Centre for Faculty Development">Centre for Faculty Development</option>
                  <option value="Centre for Food Technology">Centre for Food Technology</option>
                  <option value="Centre for Geoscience and Engineering">Centre for Geoscience and Engineering</option>
                  <option value="Centre for Human Settlements">Centre for Human Settlements</option>
                  <option value="Centre for Intellectual Property Right and Trade Marks">Centre for Intellectual Property Right and Trade Marks</option>
                  <option value="Centre for International Affairs">Centre for International Affairs</option>
                  <option value="Centre for Medical Electronics">Centre for Medical Electronics</option>
                  <option value="Centre for Nano Science and Technology">Centre for Nano Science and Technology</option>
                  <option value="Centre for Natural and Renewable Sources of Energy">Centre for Natural and Renewable Sources of Energy</option>
                  <option value="Centre for Professional Development Education">Centre for Professional Development Education</option>
                  <option value="Centre for Research">Centre for Research</option>
                  <option value="Centre for Technology Development and Transfer">Centre for Technology Development and Transfer</option>
                  <option value="Centre for University Industry Collaboration">Centre for University Industry Collaboration</option>
                  <option value="Centre for Water Resources">Centre for Water Resources</option>
                  <option value="Centre with Potential for Excellence in Environment Science">Centre with Potential for Excellence in Environment Science</option>
                  <option value="Chemical Engineering Workshop">Chemical Engineering Workshop</option>
                  <option value="Civil/Electrical Minor Work Cells">Civil/Electrical Minor Work Cells</option>
                  <option value="College of Engineering Guindy">College of Engineering Guindy</option>
                  <option value="Computer Centre - MIT">Computer Centre - MIT</option>
                  <option value="Controller of Examination - MIT">Controller of Examination - MIT</option>
                  <option value="Crystal Growth Centre">Crystal Growth Centre</option>
                  <option value="Department of Aerospace Engineering">Department of Aerospace Engineering</option>
                  <option value="Department of Applied Science and Humanities">Department of Applied Science and Humanities</option>
                  <option value="Department of Applied Science and Technology">Department of Applied Science and Technology</option>
                  <option value="Department of Architecture">Department of Architecture</option>
                  <option value="Department of Automobile Engineering">Department of Automobile Engineering</option>
                  <option value="Department of Biotechnology">Department of Biotechnology</option>
                  <option value="Department of Ceramic Technology">Department of Ceramic Technology</option>
                  <option value="Department of Chemical Engineering">Department of Chemical Engineering</option>
                  <option value="Department of Chemistry">Department of Chemistry</option>
                  <option value="Department of Civil Engineering">Department of Civil Engineering</option>
                  <option value="Department of Computer Science and Engineering">Department of Computer Science and Engineering</option>
                  <option value="Department of Computer Technology">Department of Computer Technology</option>
                  <option value="Department of Electrical and Electronics Engineering">Department of Electrical and Electronics Engineering</option>
                  <option value="Department of Electronics and Communication Engineering">Department of Electronics and Communication Engineering</option>
                  <option value="Department of Electronics Engineering">Department of Electronics Engineering</option>
                  <option value="Department of English">Department of English</option>
                  <option value="Department of Geology">Department of Geology</option>
                  <option value="Depatment of Industrial Engineering">Depatment of Industrial Engineering</option>
                  <option value="Department of Information Science and Technology">Department of Information Science and Technology</option>
                  <option value="Department of Information Technology">Department of Information Technology</option>
                  <option value="Department of Instrumentation Engineering">Department of Instrumentation Engineering</option>
                  <option value="Department of Leather Technology">Department of Leather Technology</option>
                  <option value="Department of Management Studies">Department of Management Studies</option>
                  <option value="Department of Manufacturing Engineering">Department of Manufacturing Engineering</option>
                  <option value="Department of Mathematics">Department of Mathematics</option>
                  <option value="Department of Mechanical Engineering">Department of Mechanical Engineering</option>
                  <option value="Department of Media Sciences">Department of Media Sciences</option>
                  <option value="Department of Medical Physics">Department of Medical Physics</option>
                  <option value="Department of Mining Engineering">Department of Mining Engineering</option>
                  <option value="Department of Physics">Department of Physics</option>
                  <option value="Department of Planning">Department of Planning</option>
                  <option value="Department of Printing Technology">Department of Printing Technology</option>
                  <option value="Department of Production Technolgy">Department of Production Technolgy</option>
                  <option value="Depertment of Rubber and Plastic Technology">Depertment of Rubber and Plastic Technology</option>
                  <option value="Department of Textile Technology">Department of Textile Technology</option>
                  <option value="Distance Education Study Centre">Distance Education Study Centre</option>
                  <option value="Division of Applied Science and Humanities">Division of Applied Science and Humanities</option>
                  <option value="Division of Avonics Engineering">Division of Avonics Engineering</option>
                  <option value="Division of Central Workshop">Division of Central Workshop</option>
                  <option value="Division of Engineering Design">Division of Engineering Design</option>
                  <option value="Division of High Voltage Engineering">Division of High Voltage Engineering</option>
                  <option value="Division of Power System">Division of Power System</option>
                  <option value="Division of Refrigeration and Air Conditioning">Division of Refrigeration and Air Conditioning</option>
                  <option value="Division of Soil Mechanics and Foundation Management">Division of Soil Mechanics and Foundation Management</option>
                  <option value="Division of Structural Engineering">Division of Structural Engineering</option>
                  <option value="Division of Transportation Engineering">Division of Transportation Engineering</option>
                  <option value="Division of Internal Combustion Engineering">Division of Internal Combustion Engineering</option>
                  <option value="E-governance Project">E-governance Project</option>
                  <option value="Educational Multimedia Research Centre">Educational Multimedia Research Centre</option>
                  <option value="Estate Office">Estate Office</option>
                  <option value="Estate Office - MIT">Estate Office - MIT</option>
                  <option value="Faculty of Architecture and Planning">Faculty of Architecture and Planning</option>
                  <option value="Faculty of Civil Engineering">Faculty of Civil Engineering</option>
                  <option value="Faculty of Electrical and Electronic Engineering">Faculty of Electrical and Electronic Engineering</option>
                  <option value="Faculty of Information and Communication Engineering">Faculty of Information and Communication Engineering</option>
                  <option value="Faculty of Management Sciences">Faculty of Management Sciences</option>
                  <option value="Faculty of Mechanical Engineering">Faculty of Mechanical Engineering</option>
                  <option value="Faculty of Science and Humanities">Faculty of Science and Humanities</option>
                  <option value="Faculty of Technology">Faculty of Technology</option>
                  <option value="Girls Hostel">Girls Hostel</option>
                  <option value="Health Care">Health Care</option>
                  <option value="Institute of Energy Studies">Institute of Energy Studies</option>
                  <option value="Institute of Ocean Management">Institute of Ocean Management</option>
                  <option value="Institute of Remote Sensing">Institute of Remote Sensing</option>
                  <option value="Internal Quality Assurance Cell">Internal Quality Assurance Cell</option>
                  <option value="Knowledge Data Centre">Knowledge Data Centre</option>
                  <option value="Library MIT">Library MIT</option>
                  <option value="Logistic Centre">Logistic Centre</option>
                  <option value="Madras Institute of Technology">Madras Institute of Technology</option>
                  <option value="Maintenance Cell">Maintenance Cell</option>
                  <option value="National Cadet Corps">National Cadet Corps</option>
                  <option value="National Hub for Healthcare Instrumentation Development">National Hub for Healthcare Instrumentation Development</option>
                  <option value="National Service Scheme">National Service Scheme</option>
                  <option value="Office of the Controller of Examinations">Office of the Controller of Examinations</option>
                  <option value="Ramanujan Computing Centre">Ramanujan Computing Centre</option>
                  <option value="Registrar office">Registrar office</option>
                  <option value="SC/ST Cell">SC/ST Cell</option>
                  <option value="School of Architecture and Planning">School of Architecture and Planning</option>
                  <option value="Sports Board">Sports Board</option>
                  <option value="Student Affairs">Student Affairs</option>
                  <option value="Syndicate">Syndicate</option>
                  <option value="Training Centre for Career Advancement">Training Centre for Career Advancement</option>
                  <option value="University Library">University Library</option>
                  <option value="Workshop - MIT">Workshop - MIT</option>
                  <option value="Youth Red Cross">Youth Red Cross</option>
                  <option value="Others">Others</option>
                </select>
          </Form.Item>
              <Form.Item label="CAMPUS">
                <select name = "campus" onChange ={this.onChange} defaultValue = {emp.campus}>
                  <option value="">None</option>
                  <option value="CEG">CEG</option>
                  <option value="MIT">MIT</option>
                  <option value="ACT">ACT</option>
                  <option value="SAP">SAP</option>
                </select>
              </Form.Item>
              <Form.Item label="PRESENT PAY">
                <Input type="number" name = "present_pay" placeholder="Present Pay" defaultValue = {emp.present_pay} onChange = {this.onChange} />
              </Form.Item>
              <Form.Item label="SCALE OF PAY">
                <Input name = "scale_of_pay" onChange = {this.onChange} defaultValue = {emp.scale_of_pay}/>
              </Form.Item>
              <Form.Item label="NATURE OF APPOINTMENT">
                <select name="nature_of_app" onChange = {this.onChange} defaultValue = {emp.nature_of_app}>
                  <option value="Regular">Regular</option>
                  <option value="Temporary">Temporary</option>
                </select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType = "submit">Submit</Button>
              </Form.Item>
              </div>

            ) : (emp.position_type === "prev" ? (

              <div>
              <Form.Item label="DESIGNATION">
              <Input name = "designation" placeholder="Enter Designation" required defaultValue = {emp.designation} onChange = {this.onChange} />
              </Form.Item>
              <Form.Item label="DURATION">
                <label>From</label>{'\u00A0'}{'\u00A0'}
                <input type = "date" required name="from_date" defaultValue={emp.from_date} onChange={this.onChange} defaultValue={emp.from_date}></input>
                {'\u00A0'}{'\u00A0'}
                <label>To</label>{'\u00A0'}{'\u00A0'}           
                <input type = "date" required name="to_date" defaultValue={emp.to_date} onChange={this.onChange} defaultValue={emp.to_date}></input>
              </Form.Item>
              <Form.Item label="DEPARTMENT/CENTRE">
              <select name="department" defaultValue={emp.department} onChange = {this.onChange}>
                  <option value="">None</option>
                  <option value="ADDITIONAL CONTROLLER OF EXAMINATION">ADDITIONAL CONTROLLER OF EXAMINATION</option>
                  <option value="Administrative Office">Administrative Office</option>
                  <option value="Alagappa College of Technology">Alagappa College of Technology</option>
                  <option value="Anna University">Anna University</option>
                  <option value="Anna University Sport Board">Anna University Sport Board</option>
                  <option value="AU-FRG Institute for CAD/CAM">AU-FRG Institute for CAD/CAM</option>
                  <option value="AU-KBC Research Centre">AU-KBC Research Centre</option>
                  <option value="AU-RU Urban Energy Centre">AU-RU Urban Energy Centre</option>
                  <option value="AU-TVS Centre for Quality Management">AU-TVS Centre for Quality Management</option>
                  <option value="Audio Visual Research Centre">Audio Visual Research Centre</option>
                  <option value="Boys Hostel">Boys Hostel</option>
                  <option value="Building Technology Centre">Building Technology Centre</option>
                  <option value="Centre for Academic Courses">Centre for Academic Courses</option>
                  <option value="Centre for Admissions">Centre for Admissions</option>
                  <option value="Centre for Aerospace Research">Centre for Aerospace Research</option>
                  <option value="Centre for Affliation of Institutions">Centre for Affliation of Institutions</option>
                  <option value="Centre for Alumni Affairs">Centre for Alumni Affairs</option>
                  <option value="Centre for Applied Research in Indic Technologies">Centre for Applied Research in Indic Technologies</option>
                  <option value="Centre for Bio Technology">Centre for Bio Technology</option>
                  <option value="Centre for Climate Change and Adaptation Research">Centre for Climate Change and Adaptation Research</option>
                  <option value="Centre for Development of Tamil in Engineering & Technology">Centre for Development of Tamil in Engineering & Technology</option>
                  <option value="Centre for Disaster Mitigation and Management">Centre for Disaster Mitigation and Management</option>
                  <option value="Centre for Distance Education">Centre for Distance Education</option>
                  <option value="Centre for Empowerment of Women">Centre for Empowerment of Women</option>
                  <option value="Centre for Enterpreneurship Development">Centre for Enterpreneurship Development</option>
                  <option value="Centre for Entrance Examinations">Centre for Entrance Examinations</option>
                  <option value="Centre for Environmantal Studies">Centre for Environmantal Studies</option>
                  <option value="Centre for Faculty Development">Centre for Faculty Development</option>
                  <option value="Centre for Food Technology">Centre for Food Technology</option>
                  <option value="Centre for Geoscience and Engineering">Centre for Geoscience and Engineering</option>
                  <option value="Centre for Human Settlements">Centre for Human Settlements</option>
                  <option value="Centre for Intellectual Property Right and Trade Marks">Centre for Intellectual Property Right and Trade Marks</option>
                  <option value="Centre for International Affairs">Centre for International Affairs</option>
                  <option value="Centre for Medical Electronics">Centre for Medical Electronics</option>
                  <option value="Centre for Nano Science and Technology">Centre for Nano Science and Technology</option>
                  <option value="Centre for Natural and Renewable Sources of Energy">Centre for Natural and Renewable Sources of Energy</option>
                  <option value="Centre for Professional Development Education">Centre for Professional Development Education</option>
                  <option value="Centre for Research">Centre for Research</option>
                  <option value="Centre for Technology Development and Transfer">Centre for Technology Development and Transfer</option>
                  <option value="Centre for University Industry Collaboration">Centre for University Industry Collaboration</option>
                  <option value="Centre for Water Resources">Centre for Water Resources</option>
                  <option value="Centre with Potential for Excellence in Environment Science">Centre with Potential for Excellence in Environment Science</option>
                  <option value="Chemical Engineering Workshop">Chemical Engineering Workshop</option>
                  <option value="Civil/Electrical Minor Work Cells">Civil/Electrical Minor Work Cells</option>
                  <option value="College of Engineering Guindy">College of Engineering Guindy</option>
                  <option value="Computer Centre - MIT">Computer Centre - MIT</option>
                  <option value="Controller of Examination - MIT">Controller of Examination - MIT</option>
                  <option value="Crystal Growth Centre">Crystal Growth Centre</option>
                  <option value="Department of Aerospace Engineering">Department of Aerospace Engineering</option>
                  <option value="Department of Applied Science and Humanities">Department of Applied Science and Humanities</option>
                  <option value="Department of Applied Science and Technology">Department of Applied Science and Technology</option>
                  <option value="Department of Architecture">Department of Architecture</option>
                  <option value="Department of Automobile Engineering">Department of Automobile Engineering</option>
                  <option value="Department of Biotechnology">Department of Biotechnology</option>
                  <option value="Department of Ceramic Technology">Department of Ceramic Technology</option>
                  <option value="Department of Chemical Engineering">Department of Chemical Engineering</option>
                  <option value="Department of Chemistry">Department of Chemistry</option>
                  <option value="Department of Civil Engineering">Department of Civil Engineering</option>
                  <option value="Department of Computer Science and Engineering">Department of Computer Science and Engineering</option>
                  <option value="Department of Computer Technology">Department of Computer Technology</option>
                  <option value="Department of Electrical and Electronics Engineering">Department of Electrical and Electronics Engineering</option>
                  <option value="Department of Electronics and Communication Engineering">Department of Electronics and Communication Engineering</option>
                  <option value="Department of Electronics Engineering">Department of Electronics Engineering</option>
                  <option value="Department of English">Department of English</option>
                  <option value="Department of Geology">Department of Geology</option>
                  <option value="Depatment of Industrial Engineering">Depatment of Industrial Engineering</option>
                  <option value="Department of Information Science and Technology">Department of Information Science and Technology</option>
                  <option value="Department of Information Technology">Department of Information Technology</option>
                  <option value="Department of Instrumentation Engineering">Department of Instrumentation Engineering</option>
                  <option value="Department of Leather Technology">Department of Leather Technology</option>
                  <option value="Department of Management Studies">Department of Management Studies</option>
                  <option value="Department of Manufacturing Engineering">Department of Manufacturing Engineering</option>
                  <option value="Department of Mathematics">Department of Mathematics</option>
                  <option value="Department of Mechanical Engineering">Department of Mechanical Engineering</option>
                  <option value="Department of Media Sciences">Department of Media Sciences</option>
                  <option value="Department of Medical Physics">Department of Medical Physics</option>
                  <option value="Department of Mining Engineering">Department of Mining Engineering</option>
                  <option value="Department of Physics">Department of Physics</option>
                  <option value="Department of Planning">Department of Planning</option>
                  <option value="Department of Printing Technology">Department of Printing Technology</option>
                  <option value="Department of Production Technolgy">Department of Production Technolgy</option>
                  <option value="Depertment of Rubber and Plastic Technology">Depertment of Rubber and Plastic Technology</option>
                  <option value="Department of Textile Technology">Department of Textile Technology</option>
                  <option value="Distance Education Study Centre">Distance Education Study Centre</option>
                  <option value="Division of Applied Science and Humanities">Division of Applied Science and Humanities</option>
                  <option value="Division of Avonics Engineering">Division of Avonics Engineering</option>
                  <option value="Division of Central Workshop">Division of Central Workshop</option>
                  <option value="Division of Engineering Design">Division of Engineering Design</option>
                  <option value="Division of High Voltage Engineering">Division of High Voltage Engineering</option>
                  <option value="Division of Power System">Division of Power System</option>
                  <option value="Division of Refrigeration and Air Conditioning">Division of Refrigeration and Air Conditioning</option>
                  <option value="Division of Soil Mechanics and Foundation Management">Division of Soil Mechanics and Foundation Management</option>
                  <option value="Division of Structural Engineering">Division of Structural Engineering</option>
                  <option value="Division of Transportation Engineering">Division of Transportation Engineering</option>
                  <option value="Division of Internal Combustion Engineering">Division of Internal Combustion Engineering</option>
                  <option value="E-governance Project">E-governance Project</option>
                  <option value="Educational Multimedia Research Centre">Educational Multimedia Research Centre</option>
                  <option value="Estate Office">Estate Office</option>
                  <option value="Estate Office - MIT">Estate Office - MIT</option>
                  <option value="Faculty of Architecture and Planning">Faculty of Architecture and Planning</option>
                  <option value="Faculty of Civil Engineering">Faculty of Civil Engineering</option>
                  <option value="Faculty of Electrical and Electronic Engineering">Faculty of Electrical and Electronic Engineering</option>
                  <option value="Faculty of Information and Communication Engineering">Faculty of Information and Communication Engineering</option>
                  <option value="Faculty of Management Sciences">Faculty of Management Sciences</option>
                  <option value="Faculty of Mechanical Engineering">Faculty of Mechanical Engineering</option>
                  <option value="Faculty of Science and Humanities">Faculty of Science and Humanities</option>
                  <option value="Faculty of Technology">Faculty of Technology</option>
                  <option value="Girls Hostel">Girls Hostel</option>
                  <option value="Health Care">Health Care</option>
                  <option value="Institute of Energy Studies">Institute of Energy Studies</option>
                  <option value="Institute of Ocean Management">Institute of Ocean Management</option>
                  <option value="Institute of Remote Sensing">Institute of Remote Sensing</option>
                  <option value="Internal Quality Assurance Cell">Internal Quality Assurance Cell</option>
                  <option value="Knowledge Data Centre">Knowledge Data Centre</option>
                  <option value="Library MIT">Library MIT</option>
                  <option value="Logistic Centre">Logistic Centre</option>
                  <option value="Madras Institute of Technology">Madras Institute of Technology</option>
                  <option value="Maintenance Cell">Maintenance Cell</option>
                  <option value="National Cadet Corps">National Cadet Corps</option>
                  <option value="National Hub for Healthcare Instrumentation Development">National Hub for Healthcare Instrumentation Development</option>
                  <option value="National Service Scheme">National Service Scheme</option>
                  <option value="Office of the Controller of Examinations">Office of the Controller of Examinations</option>
                  <option value="Ramanujan Computing Centre">Ramanujan Computing Centre</option>
                  <option value="Registrar office">Registrar office</option>
                  <option value="SC/ST Cell">SC/ST Cell</option>
                  <option value="School of Architecture and Planning">School of Architecture and Planning</option>
                  <option value="Sports Board">Sports Board</option>
                  <option value="Student Affairs">Student Affairs</option>
                  <option value="Syndicate">Syndicate</option>
                  <option value="Training Centre for Career Advancement">Training Centre for Career Advancement</option>
                  <option value="University Library">University Library</option>
                  <option value="Workshop - MIT">Workshop - MIT</option>
                  <option value="Youth Red Cross">Youth Red Cross</option>
                  <option value="Others">Others</option>
                </select>
              </Form.Item>
              <Form.Item label="CAMPUS">
                <select name = "campus" onChange ={this.onChange} defaultValue = {emp.campus}>
                  <option value="">None</option>
                  <option value="CEG">CEG</option>
                  <option value="MIT">MIT</option>
                  <option value="ACT">ACT</option>
                  <option value="SAP">SAP</option>
                </select></Form.Item>
              <Form.Item label="NATURE OF APPOINTMENT">
                <select name="nature_of_app" onChange = {this.onChange} defaultValue = {emp.nature_of_app}>
                  <option value="Regular">Regular</option>
                  <option value="Temporary">Temporary</option>
                </select></Form.Item>
              <Form.Item>
                <Button type="primary" htmlType = "submit">Submit</Button>
              </Form.Item>
              </div>

            ) : (
            emp.position_type === "present_add" ? 
            (
              <div>
              <Form.Item label="POSITION">
              <select name="position" defaultValue={emp.position} onChange = {this.onChange}>
              <option disabled value="">None</option>
            <option value="ADDITIONAL CONTROLLER OF EXAMINATION">ADDITIONAL CONTROLLER OF EXAMINATION</option>
            <option value="ADDITIONAL DIRECTOR">ADDITIONAL DIRECTOR</option>
            <option value="ADDITIONAL REGISTRAR">ADDITIONAL REGISTRAR</option>
            <option value="ASSISTANT REGISTRAR">ASSISTANT REGISTRAR</option>
            <option value="CHAIRMAN">CHAIRMAN</option>
            <option value="CO-CORDINATOR">CO-CORDINATOR</option>
            <option value="CONTROLLER OF EXAMINATIONS">CONTROLLER OF EXAMINATIONS</option>
            <option value="COORDINATOR">COORDINATOR</option>
            <option value="DEAN">DEAN</option>
            <option value="DEPUTY CHAIRMAN">DEPUTY CHAIRMAN</option>
            <option value="DEPUTY CONTROLLER OF EXAMINATION">DEPUTY CONTROLLER OF EXAMINATION</option>
            <option value="DEPUTY DIRECTOR">DEPUTY DIRECTOR</option>
            <option value="DEPUTY REGISTRAR">DEPUTY REGISTRAR</option>
            <option value="DEPUTY WARDEN">DEPUTY WARDEN</option>
            <option value="DIRECTOR">DIRECTOR</option>
            <option value="EMIRITUS FELLOWSHIP">EMIRITUS FELLOWSHIP</option>
            <option value="EXECUTIVE WARDEN">EXECUTIVE WARDEN</option>
            <option value="HEAD OF THE DEPARTMENT">HEAD OF THE DEPARTMENT</option>
            <option value="HEAD OF THE DIVISION">HEAD OF THE DIVISION</option>
            <option value="MEMBER">MEMBER</option>
            <option value="MEMBER SECRETARY">MEMBER SECRETARY</option>
            <option value="PRINCIPAL SCIENTIFIC OFFICER">PRINCIPAL SCIENTIFIC OFFICER</option>
            <option value="PROFESSOR AND ESTATE OFFICER">PROFESSOR AND ESTATE OFFICER</option>
            <option value="PROFESSOR IN-CHARGE MIT LIBRARY">PROFESSOR IN-CHARGE MIT LIBRARY</option>
            <option value="PROFESSOR OF PLANNING AND DEVELOPMENT">PROFESSOR OF PLANNING AND DEVELOPMENT</option>
            <option value="PROFESSOR WORKSHOP SUPERINTENDANT">PROFESSOR WORKSHOP SUPERINTENDANT</option>
            <option value="PROFESSOR IN-CHARGE OF LEGAL CELL">PROFESSOR IN-CHARGE OF LEGAL CELL</option>
            <option value="PROFESSOR IN-CHARGE OF SYNDICAYTE SECTION">PROFESSOR IN-CHARGE OF SYNDICAYTE SECTION</option>
            <option value="PROHRAMME OFFICER">PROHRAMME OFFICER</option>
            <option value="PS TO VICE CHANCELLOR">PS TO VICE CHANCELLOR</option>
            <option value="REGISTRAR">REGISTRAR</option>
            <option value="RESIDENT COUNSELOR">RESIDENT COUNSELOR</option>
            <option value="SENIOR PROJECT LEADER">SENIOR PROJECT LEADER</option>
            <option value="STUDENT COUNSELLOR">STUDENT COUNSELLOR</option>
            <option value="VICE CHANCELLOR">VICE CHANCELLOR</option>
            <option value="WARDEN">WARDEN</option>
              </select>
          </Form.Item>
              <Form.Item label="DEPARTMENT/CENTRE">
              <select name="department" defaultValue={emp.department} onChange = {this.onChange}>
                  <option value="">None</option>
                  <option value="ADDITIONAL CONTROLLER OF EXAMINATION">ADDITIONAL CONTROLLER OF EXAMINATION</option>
                  <option value="Administrative Office">Administrative Office</option>
                  <option value="Alagappa College of Technology">Alagappa College of Technology</option>
                  <option value="Anna University">Anna University</option>
                  <option value="Anna University Sport Board">Anna University Sport Board</option>
                  <option value="AU-FRG Institute for CAD/CAM">AU-FRG Institute for CAD/CAM</option>
                  <option value="AU-KBC Research Centre">AU-KBC Research Centre</option>
                  <option value="AU-RU Urban Energy Centre">AU-RU Urban Energy Centre</option>
                  <option value="AU-TVS Centre for Quality Management">AU-TVS Centre for Quality Management</option>
                  <option value="Audio Visual Research Centre">Audio Visual Research Centre</option>
                  <option value="Boys Hostel">Boys Hostel</option>
                  <option value="Building Technology Centre">Building Technology Centre</option>
                  <option value="Centre for Academic Courses">Centre for Academic Courses</option>
                  <option value="Centre for Admissions">Centre for Admissions</option>
                  <option value="Centre for Aerospace Research">Centre for Aerospace Research</option>
                  <option value="Centre for Affliation of Institutions">Centre for Affliation of Institutions</option>
                  <option value="Centre for Alumni Affairs">Centre for Alumni Affairs</option>
                  <option value="Centre for Applied Research in Indic Technologies">Centre for Applied Research in Indic Technologies</option>
                  <option value="Centre for Bio Technology">Centre for Bio Technology</option>
                  <option value="Centre for Climate Change and Adaptation Research">Centre for Climate Change and Adaptation Research</option>
                  <option value="Centre for Development of Tamil in Engineering & Technology">Centre for Development of Tamil in Engineering & Technology</option>
                  <option value="Centre for Disaster Mitigation and Management">Centre for Disaster Mitigation and Management</option>
                  <option value="Centre for Distance Education">Centre for Distance Education</option>
                  <option value="Centre for Empowerment of Women">Centre for Empowerment of Women</option>
                  <option value="Centre for Enterpreneurship Development">Centre for Enterpreneurship Development</option>
                  <option value="Centre for Entrance Examinations">Centre for Entrance Examinations</option>
                  <option value="Centre for Environmantal Studies">Centre for Environmantal Studies</option>
                  <option value="Centre for Faculty Development">Centre for Faculty Development</option>
                  <option value="Centre for Food Technology">Centre for Food Technology</option>
                  <option value="Centre for Geoscience and Engineering">Centre for Geoscience and Engineering</option>
                  <option value="Centre for Human Settlements">Centre for Human Settlements</option>
                  <option value="Centre for Intellectual Property Right and Trade Marks">Centre for Intellectual Property Right and Trade Marks</option>
                  <option value="Centre for International Affairs">Centre for International Affairs</option>
                  <option value="Centre for Medical Electronics">Centre for Medical Electronics</option>
                  <option value="Centre for Nano Science and Technology">Centre for Nano Science and Technology</option>
                  <option value="Centre for Natural and Renewable Sources of Energy">Centre for Natural and Renewable Sources of Energy</option>
                  <option value="Centre for Professional Development Education">Centre for Professional Development Education</option>
                  <option value="Centre for Research">Centre for Research</option>
                  <option value="Centre for Technology Development and Transfer">Centre for Technology Development and Transfer</option>
                  <option value="Centre for University Industry Collaboration">Centre for University Industry Collaboration</option>
                  <option value="Centre for Water Resources">Centre for Water Resources</option>
                  <option value="Centre with Potential for Excellence in Environment Science">Centre with Potential for Excellence in Environment Science</option>
                  <option value="Chemical Engineering Workshop">Chemical Engineering Workshop</option>
                  <option value="Civil/Electrical Minor Work Cells">Civil/Electrical Minor Work Cells</option>
                  <option value="College of Engineering Guindy">College of Engineering Guindy</option>
                  <option value="Computer Centre - MIT">Computer Centre - MIT</option>
                  <option value="Controller of Examination - MIT">Controller of Examination - MIT</option>
                  <option value="Crystal Growth Centre">Crystal Growth Centre</option>
                  <option value="Department of Aerospace Engineering">Department of Aerospace Engineering</option>
                  <option value="Department of Applied Science and Humanities">Department of Applied Science and Humanities</option>
                  <option value="Department of Applied Science and Technology">Department of Applied Science and Technology</option>
                  <option value="Department of Architecture">Department of Architecture</option>
                  <option value="Department of Automobile Engineering">Department of Automobile Engineering</option>
                  <option value="Department of Biotechnology">Department of Biotechnology</option>
                  <option value="Department of Ceramic Technology">Department of Ceramic Technology</option>
                  <option value="Department of Chemical Engineering">Department of Chemical Engineering</option>
                  <option value="Department of Chemistry">Department of Chemistry</option>
                  <option value="Department of Civil Engineering">Department of Civil Engineering</option>
                  <option value="Department of Computer Science and Engineering">Department of Computer Science and Engineering</option>
                  <option value="Department of Computer Technology">Department of Computer Technology</option>
                  <option value="Department of Electrical and Electronics Engineering">Department of Electrical and Electronics Engineering</option>
                  <option value="Department of Electronics and Communication Engineering">Department of Electronics and Communication Engineering</option>
                  <option value="Department of Electronics Engineering">Department of Electronics Engineering</option>
                  <option value="Department of English">Department of English</option>
                  <option value="Department of Geology">Department of Geology</option>
                  <option value="Depatment of Industrial Engineering">Depatment of Industrial Engineering</option>
                  <option value="Department of Information Science and Technology">Department of Information Science and Technology</option>
                  <option value="Department of Information Technology">Department of Information Technology</option>
                  <option value="Department of Instrumentation Engineering">Department of Instrumentation Engineering</option>
                  <option value="Department of Leather Technology">Department of Leather Technology</option>
                  <option value="Department of Management Studies">Department of Management Studies</option>
                  <option value="Department of Manufacturing Engineering">Department of Manufacturing Engineering</option>
                  <option value="Department of Mathematics">Department of Mathematics</option>
                  <option value="Department of Mechanical Engineering">Department of Mechanical Engineering</option>
                  <option value="Department of Media Sciences">Department of Media Sciences</option>
                  <option value="Department of Medical Physics">Department of Medical Physics</option>
                  <option value="Department of Mining Engineering">Department of Mining Engineering</option>
                  <option value="Department of Physics">Department of Physics</option>
                  <option value="Department of Planning">Department of Planning</option>
                  <option value="Department of Printing Technology">Department of Printing Technology</option>
                  <option value="Department of Production Technolgy">Department of Production Technolgy</option>
                  <option value="Depertment of Rubber and Plastic Technology">Depertment of Rubber and Plastic Technology</option>
                  <option value="Department of Textile Technology">Department of Textile Technology</option>
                  <option value="Distance Education Study Centre">Distance Education Study Centre</option>
                  <option value="Division of Applied Science and Humanities">Division of Applied Science and Humanities</option>
                  <option value="Division of Avonics Engineering">Division of Avonics Engineering</option>
                  <option value="Division of Central Workshop">Division of Central Workshop</option>
                  <option value="Division of Engineering Design">Division of Engineering Design</option>
                  <option value="Division of High Voltage Engineering">Division of High Voltage Engineering</option>
                  <option value="Division of Power System">Division of Power System</option>
                  <option value="Division of Refrigeration and Air Conditioning">Division of Refrigeration and Air Conditioning</option>
                  <option value="Division of Soil Mechanics and Foundation Management">Division of Soil Mechanics and Foundation Management</option>
                  <option value="Division of Structural Engineering">Division of Structural Engineering</option>
                  <option value="Division of Transportation Engineering">Division of Transportation Engineering</option>
                  <option value="Division of Internal Combustion Engineering">Division of Internal Combustion Engineering</option>
                  <option value="E-governance Project">E-governance Project</option>
                  <option value="Educational Multimedia Research Centre">Educational Multimedia Research Centre</option>
                  <option value="Estate Office">Estate Office</option>
                  <option value="Estate Office - MIT">Estate Office - MIT</option>
                  <option value="Faculty of Architecture and Planning">Faculty of Architecture and Planning</option>
                  <option value="Faculty of Civil Engineering">Faculty of Civil Engineering</option>
                  <option value="Faculty of Electrical and Electronic Engineering">Faculty of Electrical and Electronic Engineering</option>
                  <option value="Faculty of Information and Communication Engineering">Faculty of Information and Communication Engineering</option>
                  <option value="Faculty of Management Sciences">Faculty of Management Sciences</option>
                  <option value="Faculty of Mechanical Engineering">Faculty of Mechanical Engineering</option>
                  <option value="Faculty of Science and Humanities">Faculty of Science and Humanities</option>
                  <option value="Faculty of Technology">Faculty of Technology</option>
                  <option value="Girls Hostel">Girls Hostel</option>
                  <option value="Health Care">Health Care</option>
                  <option value="Institute of Energy Studies">Institute of Energy Studies</option>
                  <option value="Institute of Ocean Management">Institute of Ocean Management</option>
                  <option value="Institute of Remote Sensing">Institute of Remote Sensing</option>
                  <option value="Internal Quality Assurance Cell">Internal Quality Assurance Cell</option>
                  <option value="Knowledge Data Centre">Knowledge Data Centre</option>
                  <option value="Library MIT">Library MIT</option>
                  <option value="Logistic Centre">Logistic Centre</option>
                  <option value="Madras Institute of Technology">Madras Institute of Technology</option>
                  <option value="Maintenance Cell">Maintenance Cell</option>
                  <option value="National Cadet Corps">National Cadet Corps</option>
                  <option value="National Hub for Healthcare Instrumentation Development">National Hub for Healthcare Instrumentation Development</option>
                  <option value="National Service Scheme">National Service Scheme</option>
                  <option value="Office of the Controller of Examinations">Office of the Controller of Examinations</option>
                  <option value="Ramanujan Computing Centre">Ramanujan Computing Centre</option>
                  <option value="Registrar office">Registrar office</option>
                  <option value="SC/ST Cell">SC/ST Cell</option>
                  <option value="School of Architecture and Planning">School of Architecture and Planning</option>
                  <option value="Sports Board">Sports Board</option>
                  <option value="Student Affairs">Student Affairs</option>
                  <option value="Syndicate">Syndicate</option>
                  <option value="Training Centre for Career Advancement">Training Centre for Career Advancement</option>
                  <option value="University Library">University Library</option>
                  <option value="Workshop - MIT">Workshop - MIT</option>
                  <option value="Youth Red Cross">Youth Red Cross</option>
                  <option value="Others">Others</option>
                </select>
              </Form.Item>
              <Form.Item label="FROM DATE">
                <input type = "date" required name="from_date" onChange={this.onChange} defaultValue={emp.from_date}></input>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType = "submit">Submit</Button>
              </Form.Item>
              </div>

            )  : (emp.position_type === "prev_add" ? (
              <div>
              <Form.Item label="POSITION">
              <select name="position" defaultValue={emp.position} onChange = {this.onChange}>
              <option disabled value="">None</option>
            <option value="ADDITIONAL CONTROLLER OF EXAMINATION">ADDITIONAL CONTROLLER OF EXAMINATION</option>
            <option value="ADDITIONAL DIRECTOR">ADDITIONAL DIRECTOR</option>
            <option value="ADDITIONAL REGISTRAR">ADDITIONAL REGISTRAR</option>
            <option value="ASSISTANT REGISTRAR">ASSISTANT REGISTRAR</option>
            <option value="CHAIRMAN">CHAIRMAN</option>
            <option value="CO-CORDINATOR">CO-CORDINATOR</option>
            <option value="CONTROLLER OF EXAMINATIONS">CONTROLLER OF EXAMINATIONS</option>
            <option value="COORDINATOR">COORDINATOR</option>
            <option value="DEAN">DEAN</option>
            <option value="DEPUTY CHAIRMAN">DEPUTY CHAIRMAN</option>
            <option value="DEPUTY CONTROLLER OF EXAMINATION">DEPUTY CONTROLLER OF EXAMINATION</option>
            <option value="DEPUTY DIRECTOR">DEPUTY DIRECTOR</option>
            <option value="DEPUTY REGISTRAR">DEPUTY REGISTRAR</option>
            <option value="DEPUTY WARDEN">DEPUTY WARDEN</option>
            <option value="DIRECTOR">DIRECTOR</option>
            <option value="EMIRITUS FELLOWSHIP">EMIRITUS FELLOWSHIP</option>
            <option value="EXECUTIVE WARDEN">EXECUTIVE WARDEN</option>
            <option value="HEAD OF THE DEPARTMENT">HEAD OF THE DEPARTMENT</option>
            <option value="HEAD OF THE DIVISION">HEAD OF THE DIVISION</option>
            <option value="MEMBER">MEMBER</option>
            <option value="MEMBER SECRETARY">MEMBER SECRETARY</option>
            <option value="PRINCIPAL SCIENTIFIC OFFICER">PRINCIPAL SCIENTIFIC OFFICER</option>
            <option value="PROFESSOR AND ESTATE OFFICER">PROFESSOR AND ESTATE OFFICER</option>
            <option value="PROFESSOR IN-CHARGE MIT LIBRARY">PROFESSOR IN-CHARGE MIT LIBRARY</option>
            <option value="PROFESSOR OF PLANNING AND DEVELOPMENT">PROFESSOR OF PLANNING AND DEVELOPMENT</option>
            <option value="PROFESSOR WORKSHOP SUPERINTENDANT">PROFESSOR WORKSHOP SUPERINTENDANT</option>
            <option value="PROFESSOR IN-CHARGE OF LEGAL CELL">PROFESSOR IN-CHARGE OF LEGAL CELL</option>
            <option value="PROFESSOR IN-CHARGE OF SYNDICAYTE SECTION">PROFESSOR IN-CHARGE OF SYNDICAYTE SECTION</option>
            <option value="PROHRAMME OFFICER">PROHRAMME OFFICER</option>
            <option value="PS TO VICE CHANCELLOR">PS TO VICE CHANCELLOR</option>
            <option value="REGISTRAR">REGISTRAR</option>
            <option value="RESIDENT COUNSELOR">RESIDENT COUNSELOR</option>
            <option value="SENIOR PROJECT LEADER">SENIOR PROJECT LEADER</option>
            <option value="STUDENT COUNSELLOR">STUDENT COUNSELLOR</option>
            <option value="VICE CHANCELLOR">VICE CHANCELLOR</option>
            <option value="WARDEN">WARDEN</option>
              </select>
          </Form.Item>
              <Form.Item label="DEPARTMENT/CENTRE">
              <select name="department" defaultValue={emp.department} onChange = {this.onChange}>
                  <option value="">None</option>
                  <option value="ADDITIONAL CONTROLLER OF EXAMINATION">ADDITIONAL CONTROLLER OF EXAMINATION</option>
                  <option value="Administrative Office">Administrative Office</option>
                  <option value="Alagappa College of Technology">Alagappa College of Technology</option>
                  <option value="Anna University">Anna University</option>
                  <option value="Anna University Sport Board">Anna University Sport Board</option>
                  <option value="AU-FRG Institute for CAD/CAM">AU-FRG Institute for CAD/CAM</option>
                  <option value="AU-KBC Research Centre">AU-KBC Research Centre</option>
                  <option value="AU-RU Urban Energy Centre">AU-RU Urban Energy Centre</option>
                  <option value="AU-TVS Centre for Quality Management">AU-TVS Centre for Quality Management</option>
                  <option value="Audio Visual Research Centre">Audio Visual Research Centre</option>
                  <option value="Boys Hostel">Boys Hostel</option>
                  <option value="Building Technology Centre">Building Technology Centre</option>
                  <option value="Centre for Academic Courses">Centre for Academic Courses</option>
                  <option value="Centre for Admissions">Centre for Admissions</option>
                  <option value="Centre for Aerospace Research">Centre for Aerospace Research</option>
                  <option value="Centre for Affliation of Institutions">Centre for Affliation of Institutions</option>
                  <option value="Centre for Alumni Affairs">Centre for Alumni Affairs</option>
                  <option value="Centre for Applied Research in Indic Technologies">Centre for Applied Research in Indic Technologies</option>
                  <option value="Centre for Bio Technology">Centre for Bio Technology</option>
                  <option value="Centre for Climate Change and Adaptation Research">Centre for Climate Change and Adaptation Research</option>
                  <option value="Centre for Development of Tamil in Engineering & Technology">Centre for Development of Tamil in Engineering & Technology</option>
                  <option value="Centre for Disaster Mitigation and Management">Centre for Disaster Mitigation and Management</option>
                  <option value="Centre for Distance Education">Centre for Distance Education</option>
                  <option value="Centre for Empowerment of Women">Centre for Empowerment of Women</option>
                  <option value="Centre for Enterpreneurship Development">Centre for Enterpreneurship Development</option>
                  <option value="Centre for Entrance Examinations">Centre for Entrance Examinations</option>
                  <option value="Centre for Environmantal Studies">Centre for Environmantal Studies</option>
                  <option value="Centre for Faculty Development">Centre for Faculty Development</option>
                  <option value="Centre for Food Technology">Centre for Food Technology</option>
                  <option value="Centre for Geoscience and Engineering">Centre for Geoscience and Engineering</option>
                  <option value="Centre for Human Settlements">Centre for Human Settlements</option>
                  <option value="Centre for Intellectual Property Right and Trade Marks">Centre for Intellectual Property Right and Trade Marks</option>
                  <option value="Centre for International Affairs">Centre for International Affairs</option>
                  <option value="Centre for Medical Electronics">Centre for Medical Electronics</option>
                  <option value="Centre for Nano Science and Technology">Centre for Nano Science and Technology</option>
                  <option value="Centre for Natural and Renewable Sources of Energy">Centre for Natural and Renewable Sources of Energy</option>
                  <option value="Centre for Professional Development Education">Centre for Professional Development Education</option>
                  <option value="Centre for Research">Centre for Research</option>
                  <option value="Centre for Technology Development and Transfer">Centre for Technology Development and Transfer</option>
                  <option value="Centre for University Industry Collaboration">Centre for University Industry Collaboration</option>
                  <option value="Centre for Water Resources">Centre for Water Resources</option>
                  <option value="Centre with Potential for Excellence in Environment Science">Centre with Potential for Excellence in Environment Science</option>
                  <option value="Chemical Engineering Workshop">Chemical Engineering Workshop</option>
                  <option value="Civil/Electrical Minor Work Cells">Civil/Electrical Minor Work Cells</option>
                  <option value="College of Engineering Guindy">College of Engineering Guindy</option>
                  <option value="Computer Centre - MIT">Computer Centre - MIT</option>
                  <option value="Controller of Examination - MIT">Controller of Examination - MIT</option>
                  <option value="Crystal Growth Centre">Crystal Growth Centre</option>
                  <option value="Department of Aerospace Engineering">Department of Aerospace Engineering</option>
                  <option value="Department of Applied Science and Humanities">Department of Applied Science and Humanities</option>
                  <option value="Department of Applied Science and Technology">Department of Applied Science and Technology</option>
                  <option value="Department of Architecture">Department of Architecture</option>
                  <option value="Department of Automobile Engineering">Department of Automobile Engineering</option>
                  <option value="Department of Biotechnology">Department of Biotechnology</option>
                  <option value="Department of Ceramic Technology">Department of Ceramic Technology</option>
                  <option value="Department of Chemical Engineering">Department of Chemical Engineering</option>
                  <option value="Department of Chemistry">Department of Chemistry</option>
                  <option value="Department of Civil Engineering">Department of Civil Engineering</option>
                  <option value="Department of Computer Science and Engineering">Department of Computer Science and Engineering</option>
                  <option value="Department of Computer Technology">Department of Computer Technology</option>
                  <option value="Department of Electrical and Electronics Engineering">Department of Electrical and Electronics Engineering</option>
                  <option value="Department of Electronics and Communication Engineering">Department of Electronics and Communication Engineering</option>
                  <option value="Department of Electronics Engineering">Department of Electronics Engineering</option>
                  <option value="Department of English">Department of English</option>
                  <option value="Department of Geology">Department of Geology</option>
                  <option value="Depatment of Industrial Engineering">Depatment of Industrial Engineering</option>
                  <option value="Department of Information Science and Technology">Department of Information Science and Technology</option>
                  <option value="Department of Information Technology">Department of Information Technology</option>
                  <option value="Department of Instrumentation Engineering">Department of Instrumentation Engineering</option>
                  <option value="Department of Leather Technology">Department of Leather Technology</option>
                  <option value="Department of Management Studies">Department of Management Studies</option>
                  <option value="Department of Manufacturing Engineering">Department of Manufacturing Engineering</option>
                  <option value="Department of Mathematics">Department of Mathematics</option>
                  <option value="Department of Mechanical Engineering">Department of Mechanical Engineering</option>
                  <option value="Department of Media Sciences">Department of Media Sciences</option>
                  <option value="Department of Medical Physics">Department of Medical Physics</option>
                  <option value="Department of Mining Engineering">Department of Mining Engineering</option>
                  <option value="Department of Physics">Department of Physics</option>
                  <option value="Department of Planning">Department of Planning</option>
                  <option value="Department of Printing Technology">Department of Printing Technology</option>
                  <option value="Department of Production Technolgy">Department of Production Technolgy</option>
                  <option value="Depertment of Rubber and Plastic Technology">Depertment of Rubber and Plastic Technology</option>
                  <option value="Department of Textile Technology">Department of Textile Technology</option>
                  <option value="Distance Education Study Centre">Distance Education Study Centre</option>
                  <option value="Division of Applied Science and Humanities">Division of Applied Science and Humanities</option>
                  <option value="Division of Avonics Engineering">Division of Avonics Engineering</option>
                  <option value="Division of Central Workshop">Division of Central Workshop</option>
                  <option value="Division of Engineering Design">Division of Engineering Design</option>
                  <option value="Division of High Voltage Engineering">Division of High Voltage Engineering</option>
                  <option value="Division of Power System">Division of Power System</option>
                  <option value="Division of Refrigeration and Air Conditioning">Division of Refrigeration and Air Conditioning</option>
                  <option value="Division of Soil Mechanics and Foundation Management">Division of Soil Mechanics and Foundation Management</option>
                  <option value="Division of Structural Engineering">Division of Structural Engineering</option>
                  <option value="Division of Transportation Engineering">Division of Transportation Engineering</option>
                  <option value="Division of Internal Combustion Engineering">Division of Internal Combustion Engineering</option>
                  <option value="E-governance Project">E-governance Project</option>
                  <option value="Educational Multimedia Research Centre">Educational Multimedia Research Centre</option>
                  <option value="Estate Office">Estate Office</option>
                  <option value="Estate Office - MIT">Estate Office - MIT</option>
                  <option value="Faculty of Architecture and Planning">Faculty of Architecture and Planning</option>
                  <option value="Faculty of Civil Engineering">Faculty of Civil Engineering</option>
                  <option value="Faculty of Electrical and Electronic Engineering">Faculty of Electrical and Electronic Engineering</option>
                  <option value="Faculty of Information and Communication Engineering">Faculty of Information and Communication Engineering</option>
                  <option value="Faculty of Management Sciences">Faculty of Management Sciences</option>
                  <option value="Faculty of Mechanical Engineering">Faculty of Mechanical Engineering</option>
                  <option value="Faculty of Science and Humanities">Faculty of Science and Humanities</option>
                  <option value="Faculty of Technology">Faculty of Technology</option>
                  <option value="Girls Hostel">Girls Hostel</option>
                  <option value="Health Care">Health Care</option>
                  <option value="Institute of Energy Studies">Institute of Energy Studies</option>
                  <option value="Institute of Ocean Management">Institute of Ocean Management</option>
                  <option value="Institute of Remote Sensing">Institute of Remote Sensing</option>
                  <option value="Internal Quality Assurance Cell">Internal Quality Assurance Cell</option>
                  <option value="Knowledge Data Centre">Knowledge Data Centre</option>
                  <option value="Library MIT">Library MIT</option>
                  <option value="Logistic Centre">Logistic Centre</option>
                  <option value="Madras Institute of Technology">Madras Institute of Technology</option>
                  <option value="Maintenance Cell">Maintenance Cell</option>
                  <option value="National Cadet Corps">National Cadet Corps</option>
                  <option value="National Hub for Healthcare Instrumentation Development">National Hub for Healthcare Instrumentation Development</option>
                  <option value="National Service Scheme">National Service Scheme</option>
                  <option value="Office of the Controller of Examinations">Office of the Controller of Examinations</option>
                  <option value="Ramanujan Computing Centre">Ramanujan Computing Centre</option>
                  <option value="Registrar office">Registrar office</option>
                  <option value="SC/ST Cell">SC/ST Cell</option>
                  <option value="School of Architecture and Planning">School of Architecture and Planning</option>
                  <option value="Sports Board">Sports Board</option>
                  <option value="Student Affairs">Student Affairs</option>
                  <option value="Syndicate">Syndicate</option>
                  <option value="Training Centre for Career Advancement">Training Centre for Career Advancement</option>
                  <option value="University Library">University Library</option>
                  <option value="Workshop - MIT">Workshop - MIT</option>
                  <option value="Youth Red Cross">Youth Red Cross</option>
                  <option value="Others">Others</option>
                </select>
              </Form.Item>
              <Form.Item label="DURATION">
                <label>From</label>{'\u00A0'}{'\u00A0'}
                <input type = "date" required name="from_date" onChange={this.onChange} defaultValue={emp.from_date}></input>
                {'\u00A0'}{'\u00A0'}
                <label>To</label>{'\u00A0'}{'\u00A0'}           
                <input type = "date" required name="to_date" onChange={this.onChange} defaultValue={emp.to_date}></input>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType = "submit">Submit</Button>
              </Form.Item>
              </div>

            ):(null))))
            }

            </div>
            ) : (
            emp.emp_type === 'oth' ? (

            <div>
              <Form.Item label="DESIGNATION">
              <Input name = "designation" placeholder="Enter designation" required defaultValue = {emp.designation} onChange = {this.onChange} />
              </Form.Item>
              <Form.Item label="INSTITUTION">
                <Input name = "institution" placeholder="Enter institution" defaultValue = {emp.institution} onChange = {this.onChange} />
              </Form.Item>
              <Form.Item label="YEARS">
                <Input name = "years" placeholder="Enter years" defaultValue = {emp.years} onChange = {this.onChange} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType = "submit">Submit</Button>
              </Form.Item>
            </div>

            ) : (null)
            ) 
          }
          </Form>
          </div>
          ) : (<h1></h1>)
        }
        </CustomLayout>
      </div>
    );
  }
}



const mapStateToProps = state => ({
    employment: state.employment.employment_by_id
});

export default connect(mapStateToProps,{ editEmployment,getEmploymentbyID,deleteEmployment })(EmpEdit);
    