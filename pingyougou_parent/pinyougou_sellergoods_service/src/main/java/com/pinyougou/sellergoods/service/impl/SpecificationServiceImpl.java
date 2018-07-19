package com.pinyougou.sellergoods.service.impl;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pinyougou.mapper.TbSpecificationMapper;
import com.pinyougou.mapper.TbSpecificationOptionMapper;
import com.pinyougou.pojo.*;
import com.pinyougou.sellergoods.service.SpecificationService;
import entity.PageResult;
import entityGroup.Specification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class SpecificationServiceImpl implements SpecificationService {

    @Autowired
    private TbSpecificationMapper tbSpecificationMapper;

    @Autowired
    private TbSpecificationOptionMapper tbSpecificationOptionMapper;


    @Override
    public List<TbSpecification> findAll() {
        return tbSpecificationMapper.selectByExample(null);
    }
//分页查询
    @Override
    public PageResult findPage(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        Page page = (Page) tbSpecificationMapper.selectByExample(null);
        return new PageResult(page.getTotal(),page.getResult());
    }
//添加数据
    @Override
    public void add(Specification specification) {

        tbSpecificationMapper.insert(specification.getTbSpecification());

        List<TbSpecificationOption> specificationOptions = specification.getSpecificationOptionsList();
        for (TbSpecificationOption specificationOption : specificationOptions) {
            specificationOption.setSpecId(specification.getTbSpecification().getId());
            tbSpecificationOptionMapper.insert(specificationOption);
        }
    }
//修改前查询需要修改的参数
    @Override
    public Specification findOne(Long id) {
        Specification specification = new Specification();
        TbSpecification tbSpecification = tbSpecificationMapper.selectByPrimaryKey(id);
        specification.setTbSpecification(tbSpecification);
        TbSpecificationOptionExample tbSpecificationOptionExample = new TbSpecificationOptionExample();
        tbSpecificationOptionExample.createCriteria().andSpecIdEqualTo(id);
        List<TbSpecificationOption> tbSpecificationOptions = tbSpecificationOptionMapper.selectByExample(tbSpecificationOptionExample);
            specification.setSpecificationOptionsList(tbSpecificationOptions);
            return specification;
    }
//    修改参数
    @Override
    public void update(Specification specification) {
        tbSpecificationMapper.updateByPrimaryKey(specification.getTbSpecification());
        TbSpecificationOptionExample tbSpecificationOptionExample = new TbSpecificationOptionExample();
        tbSpecificationOptionExample.createCriteria().andSpecIdEqualTo(specification.getTbSpecification().getId());
        tbSpecificationOptionMapper.deleteByExample(tbSpecificationOptionExample);
        List<TbSpecificationOption> specificationOptionsList = specification.getSpecificationOptionsList();
        for (TbSpecificationOption tbSpecificationOption : specificationOptionsList) {
            tbSpecificationOption.setSpecId(specification.getTbSpecification().getId());
            tbSpecificationOptionMapper.insert(tbSpecificationOption);
        }

    }
//删除数据
    @Override
    public void dele(Long[] ids) {
        for (Long id : ids) {
            tbSpecificationMapper.deleteByPrimaryKey(id);
            TbSpecificationOptionExample tbSpecificationOptionExample = new TbSpecificationOptionExample();
            tbSpecificationOptionExample.createCriteria().andSpecIdEqualTo(id);
            tbSpecificationOptionMapper.deleteByExample(tbSpecificationOptionExample);
        }
    }
//根据条件查询数据
    @Override
    public PageResult search(int pageNum, int pageSize, TbSpecification tbSpecification) {
        TbSpecificationExample tbSpecificationExample = new TbSpecificationExample();
        if(StringUtils.isNotEmpty(tbSpecification.getSpecName())){
           tbSpecificationExample.createCriteria().andSpecNameLike(("%"+tbSpecification.getSpecName()+"%"));
        }
        PageHelper.startPage(pageNum,pageSize);
       Page page = (Page) tbSpecificationMapper.selectByExample(tbSpecificationExample);
        return new PageResult(page.getTotal(),page.getResult());
    }

    @Override
    public List<Map> findSpecList() {
        return tbSpecificationMapper.findSpecList();
    }
}
