package hardwareandembeddedconsultancy

import crm.Company

class BootStrap {

    def init = { servletContext ->
        new Company(name: "Individual",email: "sales@example.com",mobile: "1234567890").save()
    }
    def destroy = {
    }
}
