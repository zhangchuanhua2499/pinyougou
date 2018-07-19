package com.pinyougou.shop.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbSpecification;
import com.pinyougou.sellergoods.service.SpecificationService;
import entity.Result;
import entity.PageResult;
import entityGroup.Specification;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

//restController替代了Controller 和 requeseBody
@RestController
@RequestMapping("/specification")
//@ResponseBody
public class SpecificationController {


    @RequestMapping("/findSpecList")
    public List<Map> findSpecList(){
        return specificationService.findSpecList();
    }

    @Reference
    private SpecificationService specificationService;
//查询总数据
    @RequestMapping("/findAll")
    public List<TbSpecification> findAll(){
        return specificationService.findAll();
    }
//分页查询数据
    @RequestMapping("/findPage/{pageNum}/{pageSize}")
public PageResult findPage(@PathVariable("pageNum") int pageNum, @PathVariable("pageSize") int pageSize){

     return specificationService.findPage(pageNum,pageSize);

    }
//    添加数据
    @RequestMapping("/add")
    public Result add(@RequestBody Specification specification){
        try{
            specificationService.add(specification);
            return new Result(true,"添加成功");
        }catch (Exception e){
            return new Result(false,"添加失败");
        }
    }
//修改前查询需要修改的数据
@RequestMapping("/findOne/{id}")
public Specification findOne(@PathVariable("id") Long id){
  return specificationService.findOne(id);
}
    // 修改数据
    @RequestMapping("/update")
    public Result update(@RequestBody Specification specification){
        try{
            specificationService.update(specification);
            return new Result(true,"修改成功");
        }catch (Exception e){
            return new Result(false,"修改失败");
        }
    }
//删除数据
    @RequestMapping("/dele/{ids}")
    public Result dele(@PathVariable("ids")Long [] ids){
        try{
            specificationService.dele(ids);
            return new Result(true,"修改成功");
        }catch (Exception e){
            return new Result(false,"修改失败");
        }
    }
//根据条件查询数据
@RequestMapping("/search/{pageNum}/{pageSize}")
public PageResult search(@PathVariable("pageNum") int pageNum, @PathVariable("pageSize") int pageSize, @RequestBody TbSpecification tbSpecification) {
    System.out.println(tbSpecification.getSpecName());
    return specificationService.search(pageNum,pageSize,tbSpecification);
}

}
