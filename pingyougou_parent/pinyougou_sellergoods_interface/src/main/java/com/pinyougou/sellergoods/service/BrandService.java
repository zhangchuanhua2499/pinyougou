package com.pinyougou.sellergoods.service;

import com.pinyougou.pojo.TbBrand;
import entity.pageResult;

import java.util.List;

public interface BrandService {

    public List<TbBrand> findAll();

    pageResult findPage(int pageNum, int pageSize);

    void add(TbBrand tbBrand);

    TbBrand findOne(Long id);

    void update(TbBrand tbBrand);

    void dele(Long[] ids);

    pageResult search(int pageNum, int pageSize, TbBrand tbBrand);
}
