package com.pinyougou.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pinyougou.mapper.TbBrandMapper;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.sellergoods.service.BrandService;
import entity.pageResult;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private TbBrandMapper tbBrandMapper;

    @Override
    public List<TbBrand> findAll() {
        return tbBrandMapper.findAll();
    }
//分页查询
    @Override
    public pageResult findPage(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        Page page = (Page) tbBrandMapper.findAll();
        return new pageResult(page.getTotal(),page.getResult());
    }
//添加数据
    @Override
    public void add(TbBrand tbBrand) {
        tbBrandMapper.add(tbBrand);
    }
//修改前查询需要修改的参数
    @Override
    public TbBrand findOne(Long id) {
        return tbBrandMapper.selectByPrimayKey(id);
    }
//    修改参数
    @Override
    public void update(TbBrand tbBrand) {
      tbBrandMapper.updateByPrimayKey(tbBrand);
    }
//删除数据
    @Override
    public void dele(Long[] ids) {
        for (Long id : ids) {
            tbBrandMapper.deleteByPrimayKey(id);
        }
    }
//根据条件查询数据
    @Override
    public pageResult search(int pageNum, int pageSize, TbBrand tbBrand) {
        PageHelper.startPage(pageNum,pageSize);
       Page page = (Page) tbBrandMapper.search(tbBrand);
        return new pageResult(page.getTotal(),page.getResult());
    }
}
