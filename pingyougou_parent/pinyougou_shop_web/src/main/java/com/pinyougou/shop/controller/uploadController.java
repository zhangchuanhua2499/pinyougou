package com.pinyougou.shop.controller;

import entity.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import utils.FastDFSClient;

@RestController
@RequestMapping("/upload")
public class uploadController {

    @Value("${image_server_ip}")
private String imageServerIp;

    @RequestMapping("/uploadFile")
    public Result uploadFile(MultipartFile file){
        try {
            FastDFSClient fastDFSClient = new FastDFSClient("classpath:config/fdfs_client.conf");
            String originalFilename = file.getOriginalFilename();
            String substring = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
            String s = fastDFSClient.uploadFile(file.getBytes(),substring);
            return new Result(true,imageServerIp+s);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,"上传失败");
        }
    }
}
