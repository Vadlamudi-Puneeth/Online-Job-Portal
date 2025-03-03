package com.example.demo.model;
import java.math.BigDecimal;
import jakarta.persistence.*;
@Entity
@Table(name = "application_details")
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstname;

    private String lastname;
    private String fathername;

    @Column(nullable = false, unique = true)
    private String email;

    private String contact;
    private String course;
    private String university;

    @Column(nullable = false)
    private Integer passoutyear;

    @Column(nullable = false)
    private Double marks;


    private String country;
    private String state;
    private String district;
    private String city;

    @Column(nullable = false, length = 6)
    private String pincode;

    private String skill1;
    private String skill1Level;

    private String skill2;
    private String skill2Level;

    private String skill3;
    private String skill3Level;

    private String domainName;

    public void setDomainName(String domainName) {
        this.domainName = domainName;
    }

    public String getDomainName() {
        return domainName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFathername() {
        return fathername;
    }

    public void setFathername(String fathername) {
        this.fathername = fathername;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public Integer getPassoutyear() {
        return passoutyear;
    }

    public void setPassoutyear(Integer passoutyear) {
        this.passoutyear = passoutyear;
    }

    public Double getMarks() {
        return marks;
    }

    public void setMarks(Double marks) {
        this.marks = marks;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getSkill1() {
        return skill1;
    }

    public void setSkill1(String skill1) {
        this.skill1 = skill1;
    }

    public String getSkill1Level() {
        return skill1Level;
    }

    public void setSkill1Level(String skill1Level) {
        this.skill1Level = skill1Level;
    }

    public String getSkill2() {
        return skill2;
    }

    public void setSkill2(String skill2) {
        this.skill2 = skill2;
    }

    public String getSkill2Level() {
        return skill2Level;
    }

    public void setSkill2Level(String skill2Level) {
        this.skill2Level = skill2Level;
    }

    public String getSkill3() {
        return skill3;
    }

    public void setSkill3(String skill3) {
        this.skill3 = skill3;
    }

    public String getSkill3Level() {
        return skill3Level;
    }

    public void setSkill3Level(String skill3Level) {
        this.skill3Level = skill3Level;
    }
}
