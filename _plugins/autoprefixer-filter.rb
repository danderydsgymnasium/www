require 'autoprefixer-rails'

browsers = Jekyll.configuration({})['autoprefixer']['browsers']

module Jekyll
	module AssetFilter

		def autoprefixer(input)
			AutoprefixerRails.process(input, browsers: @browsers).css
		end

	end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)
