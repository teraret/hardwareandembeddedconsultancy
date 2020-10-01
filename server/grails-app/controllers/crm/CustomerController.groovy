package crm

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class CustomerController {

    CustomerService customerService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        def count = customerService.count()
        def offset = params.offset as Long
        Long currentpage = Math.ceil((params.max+offset)/params.max)
        Long pagecount = Math.ceil(count/params.max)
        respond customerService.list(params), model:[customerCount: count,customerPage:currentpage,customerPageCount:pagecount]
    }

    def show(Long id) {
        respond customerService.get(id)
    }

    @Transactional
    def save(Customer customer) {
        if (customer == null) {
            render status: NOT_FOUND
            return
        }
        if (customer.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond customer.errors
            return
        }

        try {
            customerService.save(customer)
        } catch (ValidationException e) {
            respond customer.errors
            return
        }

        respond customer, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Customer customer) {
        if (customer == null) {
            render status: NOT_FOUND
            return
        }
        if (customer.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond customer.errors
            return
        }

        try {
            customerService.save(customer)
        } catch (ValidationException e) {
            respond customer.errors
            return
        }

        respond customer, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        customerService.delete(id)

        render status: NO_CONTENT
    }
}
