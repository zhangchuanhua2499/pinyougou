package com.pinyougou.sellergoods.service.impl;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.pinyougou.mapper.*;
import com.pinyougou.pojo.*;
import entityGroup.Goods;
import org.springframework.beans.factory.annotation.Autowired;
import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pinyougou.pojo.TbGoodsExample.Criteria;
import com.pinyougou.sellergoods.service.GoodsService;

import entity.PageResult;

/**
 * 服务实现层
 * @author Administrator
 *
 */
@Service
public class GoodsServiceImpl implements GoodsService {

	@Autowired
	private TbGoodsMapper goodsMapper;
	@Autowired
	private TbGoodsDescMapper goodsDescMapper;

	@Autowired
	private TbItemMapper itemMapper;
	@Autowired
	private TbItemCatMapper itemCatMapper;

	@Autowired
	private TbBrandMapper brandMapper;
	@Autowired
	private TbSellerMapper sellerMapper;
	/**
	 * 查询全部
	 */
	@Override
	public List<TbGoods> findAll() {
		return goodsMapper.selectByExample(null);
	}

	/**
	 * 按分页查询
	 */
	@Override
	public PageResult findPage(int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);		
		Page<TbGoods> page=   (Page<TbGoods>) goodsMapper.selectByExample(null);
		return new PageResult(page.getTotal(), page.getResult());
	}

	/**
	 * 增加
	 */
	@Override
	public void add(Goods goods) {
		TbGoods tbGoods = goods.getTbGoods();
//		审核状态
		tbGoods.setAuditStatus("0");
		goodsMapper.insert(tbGoods);
		TbGoodsDesc tbGoodsDesc = goods.getTbGoodsDesc();
		tbGoodsDesc.setGoodsId(tbGoods.getId());
		goodsDescMapper.insert(tbGoodsDesc);
		if (tbGoods.getIsEnableSpec().equals("1")) {
			List<TbItem> tbItems = goods.getTbItems();
			for (TbItem tbItem : tbItems) {
//		String spec = tbItem.getSpec();
				//title 商品标题
				String name = tbGoods.getGoodsName();
				Map<String, String> map = JSON.parseObject(tbItem.getSpec(), Map.class);
				for (String key : map.keySet()) {
					name += " " + key + map.get(key);
				}

				tbItem.setTitle(name);
				tbItem.setSellPoint(tbGoods.getCaption());//获取的tbGoods的副标题
//			image  商品图片从tbGoodsDesc中获取
				List<Map> maps = JSON.parseArray(tbGoodsDesc.getItemImages(), Map.class);
				if (maps != null && maps.size() > 0) {
					String url = (String) maps.get(0).get("url");
					tbItem.setImage(url);
                }
//			categoryId 当前目录的ID
				tbItem.setCategoryid(tbGoods.getCategory3Id());
//			createTime 创建时间,
				tbItem.setCreateTime(new Date());
//			updateTime 更新时间
				tbItem.setUpdateTime(new Date());
//			goodsId  tbGoods的ID
				tbItem.setGoodsId(tbGoods.getId());
//			sellerId 商家的ID
				tbItem.setSellerId(tbGoods.getSellerId());
//			category 当前目录名称
				TbItemCat tbItemCat = itemCatMapper.selectByPrimaryKey(tbGoods.getCategory3Id());
				tbItem.setCategory(tbItemCat.getName());
//			brand   品牌名称
				TbBrand tbBrand = brandMapper.selectByPrimaryKey(tbGoods.getBrandId());
				tbItem.setBrand(tbBrand.getName());
//			seller  商家名称
				TbSeller tbSeller = sellerMapper.selectByPrimaryKey(tbGoods.getSellerId());
				tbItem.setSeller(tbSeller.getNickName());
//		tbItem = createTbItem(tbItem, tbGoods, tbGoodsDesc);
				itemMapper.insert(tbItem);
//			前台传过来的参数{spec:{},price:'0',num:'9999',status:'1',isDefault:'1'}];
//			后台获取的参数
//			sellPoint 商品卖点

			}
		}
//else {
//	TbItem tbItem = new TbItem();
//	tbItem.setTitle(tbGoods.getGoodsName());
//	 tbItem = createTbItem(tbItem, tbGoods, tbGoodsDesc);
//	 tbItem.setNum(9999);
//	 tbItem.setPrice(tbGoods.getPrice());
//	 tbItem.setSpec("{}");
//	 tbItem.setIsDefault("1");
//	 itemMapper.insert(tbItem);
//}
//	}
////
//	public TbItem createTbItem(TbItem tbItem,TbGoods tbGoods,TbGoodsDesc tbGoodsDesc){
//
	}
//
	/**
	 * 修改
	 */
	@Override
	public void update(TbGoods goods){
		goodsMapper.updateByPrimaryKey(goods);
	}	
	
	/**
	 * 根据ID获取实体
	 * @param id
	 * @return
	 */
	@Override
	public TbGoods findOne(Long id){
		return goodsMapper.selectByPrimaryKey(id);
	}

	/**
	 * 批量删除
	 */
	@Override
	public void delete(Long[] ids) {
		for(Long id:ids){
			goodsMapper.deleteByPrimaryKey(id);
		}		
	}
	
	
		@Override
	public PageResult findPage(TbGoods goods, int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		
		TbGoodsExample example=new TbGoodsExample();
		Criteria criteria = example.createCriteria();
		
		if(goods!=null){			
						if(goods.getSellerId()!=null && goods.getSellerId().length()>0){
				criteria.andSellerIdEqualTo(goods.getSellerId());
			}
			if(goods.getGoodsName()!=null && goods.getGoodsName().length()>0){
				criteria.andGoodsNameLike("%"+goods.getGoodsName()+"%");
			}
			if(goods.getAuditStatus()!=null && goods.getAuditStatus().length()>0){
				criteria.andAuditStatusLike("%"+goods.getAuditStatus()+"%");
			}
			if(goods.getIsMarketable()!=null && goods.getIsMarketable().length()>0){
				criteria.andIsMarketableLike("%"+goods.getIsMarketable()+"%");
			}
			if(goods.getCaption()!=null && goods.getCaption().length()>0){
				criteria.andCaptionLike("%"+goods.getCaption()+"%");
			}
			if(goods.getSmallPic()!=null && goods.getSmallPic().length()>0){
				criteria.andSmallPicLike("%"+goods.getSmallPic()+"%");
			}
			if(goods.getIsEnableSpec()!=null && goods.getIsEnableSpec().length()>0){
				criteria.andIsEnableSpecLike("%"+goods.getIsEnableSpec()+"%");
			}
			if(goods.getIsDelete()!=null && goods.getIsDelete().length()>0){
				criteria.andIsDeleteLike("%"+goods.getIsDelete()+"%");
			}
	
		}
		
		Page<TbGoods> page= (Page<TbGoods>)goodsMapper.selectByExample(example);		
		return new PageResult(page.getTotal(), page.getResult());
	}

	@Override
	public void updateAuditStatus(Long[] ids, String auditStatus) {
		for (Long id : ids) {
			TbGoods tbGoods = goodsMapper.selectByPrimaryKey(id);
			tbGoods.setAuditStatus(auditStatus);
			goodsMapper.updateByPrimaryKey(tbGoods);
		}
	}

	@Override
	public void updateMarketable(Long[] ids, String market) {
//		market 1 上架
//		market 2 下架
		for (Long id : ids) {
			TbGoods tbGoods = goodsMapper.selectByPrimaryKey(id);
			tbGoods.setIsMarketable(market);
			goodsMapper.updateByPrimaryKey(tbGoods);
		}
	}

}
