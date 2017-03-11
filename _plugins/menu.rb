module Reading
	class Generator < Jekyll::Generator

		def generate(site)
			site.pages.each do |page|
				set_menus(page, site.pages, site.data['menus'])
			end
		end

		def set_menus(page, pages, external_menus)
			dirname = File.dirname(page.path)

			menu = pages.select do |item|
				File.dirname(item.path) == dirname
			end
			page.data['has_menu'] = menu.length > 1

			page.data['menu'] = menu.sort do |a, b|
				a_order = a.data['menu_order'] || 0
				b_order = b.data['menu_order'] || 0
				a_order - b_order
			end

			if external_menus and external_menus[dirname]
				page.data['external_menu'] = external_menus[dirname]
				page.data['has_menu'] = true
			end

			page.data['dirname'] = '/' + dirname
		end

	end
end
