import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import { useRef, useState } from 'react';

type ArticleParamsFormProps = {
	handleChangeFormSettings: (value:any) => void;
	articleSettings: any;
};

export const ArticleParamsForm = ({
	handleChangeFormSettings, articleSettings
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const tempSettingsRef = useRef(articleSettings);
const handleChangeTempSettings = (key: string, value: OptionType) => {
		tempSettingsRef.current = {
			...tempSettingsRef.current,
			[key]: value,
		};
	};

	return (
		<>
			<ArrowButton isOpen={true} onClick={() => {}} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: true,
				})}>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						onChange={(option) =>
							handleChangeTempSettings('fontFamily', option)
						}
						placeholder={defaultArticleState.fontFamilyOption.title}
						selected={articleSettings.fontFamily}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						name='Размер'
						selected={articleSettings.fontSize}
						onChange={(option) =>
							handleChangeTempSettings('fontSize', option)
						}
					/>
					<Select
						title='Цвет шрифта'
						placeholder={defaultArticleState.fontColor.title}
						selected={articleSettings.fontColor}
						options={fontColors}
						onChange={(option) =>
							handleChangeTempSettings('fontColor', option)
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						placeholder={defaultArticleState.backgroundColor.title}
						selected={articleSettings.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							handleChangeTempSettings('backgroundColor', option)
						}
					/>
					<Select
						title='Ширина контента'
						placeholder={defaultArticleState.contentWidth.title}
						selected={articleSettings.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							handleChangeTempSettings('contentWidth', option)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' onClick={()=>
							handleChangeFormSettings(tempSettingsRef.current)
						} />
					</div>
				</form>
			</aside>
		</>
	);
};
