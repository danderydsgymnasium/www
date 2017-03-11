module Jekyll
	class UnusedCSS
		autoload :Oga, 'oga'
		autoload :CssParser, 'css_parser'

		def initialize(page)
			@whitelist = page.site.config['unused_css']['whitelist']
			@html = Oga.parse_html(page.output)
		end

		def clean()
			@html.css('style').each do |style|
				parser = CssParser::Parser.new
				parser.load_string! style.inner_text
				style.inner_text = ''

				parser.each_rule_set() do |rule_set, media_types|
					rule_set.selectors.find do |selector|
						selector = selector.split(':')[0]
						match = @whitelist.include?(selector) || selector[0] == '@' || @html.css(selector).length != 0

						if match
							if media_types[0].to_s == 'all'
								style.inner_text += rule_set.to_s
							else
								style.inner_text += "@media #{media_types[0].to_s} {#{rule_set.to_s}}"
							end
						end

						match
					end
				end
			end

			@html.to_xml
		end

	end
end


Jekyll::Hooks.register :pages, :post_render do |page|
	page.output = Jekyll::UnusedCSS.new(page).clean
end
Jekyll::Hooks.register :posts, :post_render do |page|
	page.output = Jekyll::UnusedCSS.new(page).clean
end
