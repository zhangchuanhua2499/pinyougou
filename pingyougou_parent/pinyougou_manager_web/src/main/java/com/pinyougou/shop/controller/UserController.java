package com.pinyougou.shop.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Security;

@RestController
@RequestMapping("/Controller")
public class UserController {
    @RequestMapping("/userName")
    public String userName(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
