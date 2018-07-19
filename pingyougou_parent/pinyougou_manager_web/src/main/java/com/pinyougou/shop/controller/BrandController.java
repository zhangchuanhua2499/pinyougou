package com.pinyougou.shop.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.sellergoods.service.BrandService;
import entity.Result;
import entity.PageResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

//restController替代了Controller 和 requeseBody
@RestController
@RequestMapping("/brand")
//@ResponseBody
public class BrandController {

    @Reference
    private BrandService brandService;



    @RequestMapping("/findBrandList")
    public List<Map> findBrandList(){
        return brandService.findBrandList();
    }
//查询总数据
    @RequestMapping("/findAll")
    public List<TbBrand> findAll(){
        return brandService.findAll();
    }
//分页查询数据
    @RequestMapping("/findPage/{pageNum}/{pageSize}")
public PageResult findPage(@PathVariable("pageNum") int pageNum, @PathVariable("pageSize") int pageSize){

     return brandService.findPage(pageNum,pageSize);

    }
//    添加数据
    @RequestMapping("/add")
    public Result add(@RequestBody TbBrand tbBrand){
        try{
            brandService.add(tbBrand);
            return new Result(true,"添加成功");
        }catch (Exception e){
            return new Result(false,"添加失败");
        }
    }
//修改前查询需要修改的数据
@RequestMapping("/findOne/{id}")
public TbBrand findOne(@PathVariable("id") Long id){
  return brandService.findOne(id);
}
    // 修改数据
    @RequestMapping("/update")
    public Result update(@RequestBody TbBrand tbBrand){
        try{
            brandService.update(tbBrand);
            return new Result(true,"修改成功");
        }catch (Exception e){
            return new Result(false,"修改失败");
        }
    }
//删除数据
    @RequestMapping("/dele/{ids}")
    public Result dele(@PathVariable("ids")Long [] ids){
        try{
            brandService.dele(ids);
            return new Result(true,"修改成功");
        }catch (Exception e){
            return new Result(false,"修改失败");
        }
    }
//根据条件查询数据
@RequestMapping("/search/{pageNum}/{pageSize}")
public PageResult search(@PathVariable("pageNum") int pageNum, @PathVariable("pageSize") int pageSize, @RequestBody TbBrand tbBrand) {

    return brandService.search(pageNum,pageSize,tbBrand);
}

}
