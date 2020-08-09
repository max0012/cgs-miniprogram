/**
 * 本文件中的配置，旨在复制app.json中页面配置
 * 注意：本文件中的页面相同应与app.json中的页面配置相同
 */
const pages = [
        "pages/index/index",
        "pages/intention/intention/intention",
        "pages/intention/intention_details/intention_details",
        "pages/mine/mine",
        "pages/login/login/login",
        "pages/login/code/code",
        "pages/product/product/product",
        "pages/product/product_detail/product_detail",
        "pages/product/product_tips/product_tips",
        "pages/product/add_product_intention/add_product_intention",
        "pages/product/product_list/product_list",
        "pages/logs/logs",
        "pages/authorize/authorize",
        "pages/agreement/agreement",
        "pages/account/balance/balance/balance",
        "pages/account/balance/update_bank_card/update_bank_card",
        "pages/account/record/record/record",
        "pages/account/record/withdraw_details/withdraw_details",
        "pages/account/achievement/achievement",
        "pages/equity/equity/equity",
        "pages/equity/reputation/reputation",
        "pages/collection/collection/collection",
        "pages/collection/news_detail/news_detail",
        "pages/coupon/coupon",
        "pages/order/add_order/add_order",
        "pages/order/order/order",
        "pages/order/order_detail/order_detail",
        "pages/setting/setting/setting",
        "pages/setting/my_info/my_info",
        "pages/setting/feedback/feedback",
        "pages/search/search/search",
        "pages/search/search_customer/search_customer",
        "pages/search/search_work/search_work",
        "pages/search/search_product/search_product",
        "pages/search/search_news/search_news",
        "pages/address/address/address",
        "pages/address/update_address/update_address"
    ];
function initPageMap(pageMap) {
	if(pageMap){
		for (let path of pages) {
			pageMap.set(path.substr(path.lastIndexOf("/") + 1), path);
		}
	} else {
		let map = new Map();
		for (let path of pages) {
			map.set(path.substr(path.lastIndexOf("/") + 1), path);
		}
		return map;
	}
}
module.exports = {
	pages:pages,
	initPageMap:initPageMap,
};