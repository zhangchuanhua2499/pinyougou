package com.pinyougou.mapper;

import com.pinyougou.pojo.TbBrand;

import java.util.List;

public interface TbBrandMapper {

    public List<TbBrand>  findAll();

    void add(TbBrand tbBrand);

    TbBrand selectByPrimayKey(Long id);

    void updateByPrimayKey(TbBrand tbBrand);

    void deleteByPrimayKey(Long id);

    List<TbBrand> search(TbBrand tbBrand);
}
