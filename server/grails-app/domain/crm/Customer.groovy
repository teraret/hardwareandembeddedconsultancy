package crm

class Customer {
    Company company
    Position position
    String name
    String email
    String mobile
    String address
    Date dateCreated
    Date lastUpdated

    static constraints = {
        name matches: "[a-zA-Z ]+"
        position nullable:true,blank:true
        email unique:true,email:true,nullable:true,blank:true
        mobile  unique:true,minSize:10,maxSize: 11,matches:"^[0-9]+"
        address nullable:true,blank:true
    }
}
