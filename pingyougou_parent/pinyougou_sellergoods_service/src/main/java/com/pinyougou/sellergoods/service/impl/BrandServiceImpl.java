package com.pinyougou.sellergoods.service.impl;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pinyougou.mapper.TbBrandMapper;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.pojo.TbBrandExample;
import com.pinyougou.sellergoods.service.BrandService;
import entity.PageResult;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;
import java.util.Map;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private TbBrandMapper tbBrandMapper;

    @Override
    public List<TbBrand> findAll() {

        return tbBrandMapper.selectByExample(null);
    }
//分页查询
    @Override
    public PageResult findPage(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        Page page = (Page) tbBrandMapper.selectByExample(null);
        return new PageResult(page.getTotal(),page.getResult());
    }
//添加数据
    @Override
    public void add(TbBrand tbBrand) {
        tbBrandMapper.insert(tbBrand);
    }
//修改前查询需要修改的参数
    @Override
    public TbBrand findOne(Long id) {
        return tbBrandMapper.selectByPrimaryKey(id);
    }
//    修改参数
    @Override
    public void update(TbBrand tbBrand) {
      tbBrandMapper.updateByPrimaryKey(tbBrand);
    }
//删除数据
    @Override
    public void dele(Long[] ids) {
        for (Long id : ids) {
            tbBrandMapper.deleteByPrimaryKey(id);
        }
    }
//根据条件查询数据
    @Override
    public PageResult search(int pageNum, int pageSize, TbBrand tbBrand) {
        TbBrandExample example = new TbBrandExample();
        if(StringUtils.isNotEmpty(tbBrand.getName())){
            example.createCriteria().andNameLike("%"+tbBrand.getName()+"%");
        }
       if(StringUtils.isNotEmpty(tbBrand.getFirstChar())){
           example.createCriteria().andFirstCharEqualTo(tbBrand.getFirstChar());
       }
        PageHelper.startPage(pageNum,pageSize);
       Page page = (Page) tbBrandMapper.selectByExample(example);
        return new PageResult(page.getTotal(),page.getResult());
    }

    @Override
    public List<Map> findBrandList() {
        return tbBrandMapper.findBrandList();
    }
}
